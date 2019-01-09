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

  clearSuggestion() {
    this.setSuggestion({ suggestions: null }, null);
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

  clearQuery() {
    this.model.clearSuggestion();
  }

  sendUpdateToView(data, searchWord) {
    const formattedHTML = this.templatizeData(data, searchWord);
    super.notify(formattedHTML);
  }

  templatizeData(suggestions, searchWord) {
    if (!searchWord || !suggestions) return '';

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
    this.inputEl.addEventListener('keydown', this.doByKeyInput.bind(this));
    this.inputEl.addEventListener('keyup', this.doByKeyInput.bind(this));
    this.inputEl.addEventListener('focusout', this.clearSuggestion.bind(this));
    document
      .querySelector('.megaMenu__trigger')
      .addEventListener('mouseenter', this.clearSuggestion.bind(this));
  }

  doByKeyInput(evt) {
    const bArrowUpOrDown = evt.key === 'ArrowDown' || evt.key === 'ArrowUp';
    if (bArrowUpOrDown && evt.type === 'keydown') {
      evt.preventDefault();
      this.navigateList(evt);
    }
    if (!bArrowUpOrDown && evt.type === 'keyup') this.queryController(evt);
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

  clearSuggestion() {
    this.controller.clearQuery();
  }

  navigateList({ key }) {
    const [, originalSearchWord] = this.controller.model.getSuggestion();
    const wrapper = this.suggestionWrapperEl;
    const focusOn = el => el.classList.add('focused');
    const focusOff = el => el.classList.remove('focused');
    const updateInput = (string) => {
      this.inputEl.value = string;
      this.inputEl.focus();
    };

    const action = {
      ArrowDown: (...args) => this.actOnArrowDown(...args),
      ArrowUp: (...args) => this.actOnArrowUp(...args),
    };

    const state = {
      wrapper,
      fn: { focusOn, focusOff, updateInput },
      originalSearchWord,
    };

    action[key].call(this, state);

    // enter key 누르거나 검색버튼 누르면
    //    preventDefault하고
    //    focused 있으면 그 링크 실행
    //      없으면 검색어로 검색 실행 (URL scheme 미적용)
  }

  actOnArrowDown({ wrapper, fn: { focusOn, focusOff, updateInput } }) {
    const firstSuggestion = wrapper.querySelector('.search__suggestionLi');
    const lastSuggestion = wrapper.querySelector('.search__suggestionLi:last-of-type');
    const focusedItem = wrapper.querySelector('.focused');

    // User is heading down to first suggestion
    if (!focusedItem) {
      focusOn(firstSuggestion);
      updateInput(firstSuggestion.innerText);
      return;
    }

    if (focusedItem === lastSuggestion) {
      // User pressed DOWN on last item => Do NOTHING
    } else {
      // User is going down further
      const nextItem = focusedItem.nextElementSibling;
      focusOff(focusedItem);
      focusOn(nextItem);
      updateInput(nextItem.innerText);
    }
  }

  actOnArrowUp({ wrapper, fn: { focusOn, focusOff, updateInput }, originalSearchWord }) {
    const firstSuggestion = wrapper.querySelector('.search__suggestionLi');
    const focusedItem = wrapper.querySelector('.focused');

    // User pressed UP on input field => Do NOTHING
    if (!focusedItem) return;

    if (focusedItem === firstSuggestion) {
      // User is heading back to input from first suggestion
      focusOff(focusedItem);
      updateInput(originalSearchWord);
    } else {
      // User is going up
      const previousItem = focusedItem.previousElementSibling;
      focusOff(focusedItem);
      focusOn(previousItem);
      updateInput(previousItem.innerText);
    }
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
