import CommonLib from '../commonLib.js';

const { debounce } = CommonLib.prototype;

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
  constructor(apiURI) {
    super();
    this.suggestion = null;
    this.API_URI = apiURI;
  }

  updateSuggestion(searchWord) {
    const queryURL = `${this.API_URI}${searchWord}`;
    const init = {
      method: 'GET',
      headers: { 'Content-Type': 'image/jpeg' },
      mode: 'cors',
    };
    const request = new Request(queryURL, init);

    fetch(request)
      .then(response => response.json())
      .catch(err => console.log(`Error during fetch: ${err}`))
      .then(json => this.setSuggestion(json));
  }

  setSuggestion({ suggestions }) {
    this.suggestion = suggestions;
    super.notify(this.getSuggestion());
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
    this.model.subscribe(this.sendUpdateToView.bind(this));
  }

  query(searchWord) {
    if (!this.queryOnDebounce) {
      this.queryOnDebounce = debounce(this.model.updateSuggestion.bind(this.model), 1000);
    }

    this.queryOnDebounce(searchWord);
  }

  sendUpdateToView(data) {
    const formattedHTML = this.templatizeData(data);
    super.notify(formattedHTML);
  }

  templatizeData(suggestions) {
    const listItems = suggestions.reduce((acc, data) => acc + this.suggestionTemplateFn(data), '');
    return `<ul>${listItems}</ul>`;
  }
}

class View {
  constructor({ controller, inputEl, suggestionWrapperEl }) {
    this.controller = controller;
    this.inputEl = inputEl;
    this.suggestionWrapperEl = suggestionWrapperEl;
  }

  init() {
    this.controller.init();
    this.controller.subscribe(this.updateSuggestion.bind(this));
    this.inputEl.addEventListener('keyup', this.queryController.bind(this));
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
  constructor({ apiURI, el: { inputEl, suggestionWrapperEl }, suggestionTemplateFn }) {
    const model = new Model(apiURI);
    const controller = new Controller(model, suggestionTemplateFn);
    const view = new View({ controller, inputEl, suggestionWrapperEl });
    this.mvc = { model, view, controller };
  }

  init() {
    this.mvc.view.init();
  }
}
