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

  notify(...data) {
    this.subscription.forEach(fn => fn(...data));
  }
}

class Model extends Observable {
  constructor(apiURI) {
    super();
    this.suggestion = null;
    this.searchWord = null;
    this.API_URI = apiURI;
  }

  updateSuggestion(searchWord) {
    // MOCK keywords section start
    const supportingWords = ['iphone8', 'bicycle hel', 'javascript'];
    const bSupportedSearch = supportingWords.reduce((bMatched, word) => {
      if (bMatched) return true;
      return word.indexOf(searchWord) > -1;
    }, false);
    if (!bSupportedSearch) {
      alert(`Sorry! 
      Search word '${searchWord}' is not supported on testing env :P
      Please try: ['iphone8', 'bicycle hel', 'javascript']`);
      return;
    }
    // MOCK keywords section end

    if (!searchWord) {
      this.setSuggestion({ suggestions: null }, null);
      return;
    }
    if (searchWord === this.searchWord) return;

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
      .then(json => this.setSuggestion(json, searchWord));
  }

  setSuggestion({ suggestions }, searchWord) {
    this.suggestion = suggestions;
    this.searchWord = searchWord;
    super.notify(...this.getSuggestion());
  }

  getSuggestion() {
    return [this.suggestion, this.searchWord];
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

  sendUpdateToView(data, searchWord) {
    const formattedHTML = this.templatizeData(data, searchWord);
    super.notify(formattedHTML);
  }

  templatizeData(suggestions, searchWord) {
    if (!searchWord) return '';

    const listItems = suggestions.reduce(
      (acc, data) => acc + this.suggestionTemplateFn(data, searchWord),
      '',
    );
    return `<ul class="search__suggestionUl">${listItems}</ul>`;
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
    document.querySelector('.main__dimmer').classList.add('opened');
    if (!formattedHTML) {
      document.querySelector('.main__dimmer').classList.remove('opened');
    }
  }

  navigateList() {
    // 포커스가 유지가 안 되니...
    // 클래스로 사기치면 될 거 같은데...
    // ArrowDown 이벤트에
    //  현재 focused클래스 있는 줄의 아래 줄로 클래스 옮겨주고
    //  input value 갱신해주고
    //  input focus 해주고
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
