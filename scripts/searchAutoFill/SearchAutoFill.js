import CommonLib from '../commonLib.js';

const { debounce } = CommonLib.prototype;

class Observable {
  constructor() {
    this.subscription = new Set();
  }

  addSubscriber(fn) {
    this.subscription.add(fn);
  }

  removeSubscriber(fn) {
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
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    };
    const request = new Request(queryURL, init);

    fetch(request)
      .then((response) => {
        if (!response.ok) {
          return new Error(`HTTP error with status code ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        if (json) this.setSuggestion(json, searchWord);
      })
      .catch(err => console.log(`Error during fetch: ${err}`));
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
  constructor(model, suggestionTemplateFn, awaitTiming) {
    super();
    this.model = model;
    this.suggestionTemplateFn = suggestionTemplateFn;
    this.queryOnDebounce = null;
    this.awaitTiming = awaitTiming;
  }

  init() {
    this.model.addSubscriber(this.sendUpdateToView.bind(this));
  }

  query(searchWord) {
    if (!this.queryOnDebounce) {
      this.queryOnDebounce = debounce(
        this.model.updateSuggestion.bind(this.model),
        this.awaitTiming,
      );
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
    this.controller.addSubscriber(this.updateSuggestion.bind(this));
    this.inputEl.addEventListener('keydown', this.doByKeyInput.bind(this));
    this.inputEl.addEventListener('keyup', this.doByKeyInput.bind(this));
    this.inputEl.addEventListener('focusout', this.clearSuggestion.bind(this));
    document
      .querySelector('.megaMenu__trigger')
      .addEventListener('mouseenter', this.clearSuggestion.bind(this));
    document
      .querySelector('.search__submitBtn')
      .addEventListener('mousedown', this.doByMouseInput.bind(this));
  }

  doByKeyInput(evt) {
    switch (evt.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        evt.preventDefault();
        if (evt.type === 'keydown') this.navigateList(evt);
        break;

      case 'Enter':
        evt.preventDefault();
        if (evt.type === 'keydown') this.moveToSearchResult();
        break;

      default:
        if (evt.type === 'keyup') this.queryController(evt);
        break;
    }
  }

  doByMouseInput(evt) {
    evt.preventDefault();
    this.moveToSearchResult();
  }

  queryController({ target }) {
    const searchWord = target.value;
    this.controller.query(searchWord);
  }

  updateSuggestion(formattedHTML) {
    const dimmer = document.querySelector('.main__dimmer');

    this.suggestionWrapperEl.innerHTML = formattedHTML;

    if (formattedHTML) {
      dimmer.classList.add('opened');
      return;
    }
    dimmer.classList.remove('opened');
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

  moveToSearchResult(bReally = false) {
    if (!bReally) {
      // Close suggestion list on mock env
      this.clearSuggestion();
      return;
    }
    // Open focused suggestion if available
    const focusedItem = document.querySelector('.search__suggestionLi.focused');
    if (focusedItem) {
      const targetLink = focusedItem.innerHTML.match(/(href=")(.*?)(")/)[2];
      window.location.assign(`${targetLink}`);
      return;
    }

    // Else then, do search without additional info
    document.querySelector('.header__search').submit();
  }
}

export default class SearchAutoFill {
  constructor({ apiURI, el: { inputEl, suggestionWrapperEl }, suggestionTemplateFn, awaitTiming }) {
    const model = new Model(apiURI);
    const controller = new Controller(model, suggestionTemplateFn, awaitTiming);
    const view = new View({ controller, inputEl, suggestionWrapperEl });
    this.mvc = { model, view, controller };
  }

  init() {
    this.mvc.view.init();
  }
}
