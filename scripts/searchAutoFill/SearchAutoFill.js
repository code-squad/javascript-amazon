import CommonLib from '../commonLib.js';

const { debounce } = new CommonLib().debounce;

class Observable {
  constructor() {
    this.subscription = new Set();
  }

  subscribe(fn) {
    this.subscription.add(fn);
  }

  unsubscribe(fn) {
    this.subscription.delete(fn);
  }

  notify(data) {
    this.subscription.forEach(fn => fn(data));
  }
}

class Model extends Observable {
  constructor({ apiURI }) {
    super();
    this.suggestion = null;
    this.API_URI = apiURI;
  }

  updateSuggestion(searchWord) {
    const queryURL = `${this.API_URI}${searchWord}`;
    fetch(queryURL)
      .then(response => response.json())
      .catch(err => console.log(`Error during fetch: ${err}`))
      .then(json => this.setSuggestion(json));
  }

  setSuggestion(json) {
    this.suggestion = json;
    super.notify(this.getSuggestion);
  }

  getSuggestion() {
    return this.suggestion;
  }
}

class Controller extends Observable {
  constructor(model, suggestionTemplateFn) {
    super();
    this.model = model;
    this.suggestionTemplateFn = suggestionTemplateFn;
    this.queryOnDebounce = null;
  }

  init() {
    this.model.subscribe(this.sendUpdateToView);
  }

  query(searchWord) {
    if (!this.queryOnDebounce) {
      this.queryOnDebounce = debounce(this.model.updateSuggestion(searchWord), 1000);
    }

    this.queryOnDebounce();
  }

  sendUpdateToView(data) {
    const formattedHTML = this.templatizeData(data);
    super.notify(formattedHTML);
  }

  templatizeData({ suggestions }) {
    return suggestions.forEach(data => this.suggestionTemplateFn(data));
  }
}

class View {
  constructor({ controller, inputEl, suggestionWrapperEl }) {
    this.controller = controller;
    this.inputEl = inputEl;
    this.suggestionWrapperEl = suggestionWrapperEl;
  }

  init() {
    this.controller.subscribe(this.updateSuggestion);
    this.inputEl.addEventListener('change', this.queryController);
  }

  queryController({ target }) {
    const searchWord = target.value;
    this.controller.query(searchWord);
  }

  updateSuggestion(formattedHTML) {
    this.suggestionWrapperEl.innerHTML = formattedHTML;
  }
}

export default class SearchAutoFill {
  constructor(inputEl, suggestionWrapperEl, suggestionTemplateFn) {
    const model = new Model({ apiURI: 'http://crong.codesquad.kr:8080/amazon-ac/' });
    const controller = new Controller(model, suggestionTemplateFn);
    const view = new View({ controller, inputEl, suggestionWrapperEl });
    this.mvc = { model, controller, view };
  }
}
