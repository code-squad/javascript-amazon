/* eslint-disable class-methods-use-this */
import * as _ from '../../utils/allenibrary.js';
import Subscriber from '../../utils/subscriber.js';

class SearchBarUI extends Subscriber {
  constructor({ stateManager, config: { inputSelector, buttonSelector } }) {
    super();
    this.inputEl = _.$(inputSelector);
    this.buttonEl = _.$(buttonSelector);
    this.init(stateManager);
  }

  init(publisher) {
    this.subscribe('searchBarUI', publisher);
    this.addFocusEvent();
    this.addKeyupEvent();
    this.addKeydownEvent();
    this.addClickEvent();
    this.addHoverEvent();
    this.addMouseOutEvent();
  }

  addMouseOutEvent() {
    const funcMap = {
      suggestions: target => this.handleMouseOut(target),
      keywords: target => this.handleMouseOut(target)
    };

    _.delegate(this.inputEl.closest('form'), 'mouseout', 'className', funcMap);
  }

  handleMouseOut(target) {
    _.setCssStyle(target, 'all', 'none');
  }

  addHoverEvent() {
    const funcMap = {
      suggestions: target => this.handleHover(target),
      keywords: target => this.handleHover(target)
    };

    _.delegate(this.inputEl.closest('form'), 'mouseover', 'className', funcMap);
  }

  handleHover(target) {
    _.setCssStyle(target, 'backgroundColor', '#f1f2f6');
  }

  addFocusEvent() {
    _.on(this.inputEl, 'focus', this.handleFocus.bind(this));
  }

  handleFocus() {
    this.publisher.setState({ mode: 'recent' });
  }

  addKeyupEvent() {
    _.on(this.inputEl, 'keyup', this.handleKeyup.bind(this));
  }

  handleKeyup({ target, key }) {
    if (key.length === 1 || key === 'Backspace') {
      const mode = target.value ? 'suggest' : 'recent';
      const param = { mode, userInput: target.value };

      _.setDebounce(p => this.publisher.setState(p), 1200, param);
    }
  }

  addKeydownEvent() {
    _.on(document, 'keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(e) {
    const { target, key } = e;
    const keyMap = {
      ArrowDown: () => {
        e.preventDefault();
        this.publisher.setState({ mode: 'select', arrowDirection: 'down' });
      },
      ArrowUp: () => {
        e.preventDefault();
        this.publisher.setState({ mode: 'select', arrowDirection: 'up' });
      },
      Enter: () => {
        e.preventDefault();
        this.publisher.setState({
          mode: 'submit',
          query: target.value
        });
      }
    };

    if (keyMap[key]) keyMap[key]();
  }

  isValidTarget(target) {
    return (
      target.className === 'suggestions' ||
      target.className === 'keywords' ||
      target === this.inputEl
    );
  }

  addClickEvent() {
    const funcMap = {
      keywords: target => this.handleClick(target),
      suggestions: target => this.handleClick(target),
      boldedSuggestion: target => this.handleClick(target)
    };

    _.delegate(this.inputEl.closest('form'), 'click', 'className', funcMap);
    _.on(this.buttonEl, 'click', this.handleBtnClick.bind(this));
  }

  handleClick(target) {
    if (this.isValidTarget(target)) {
      this.publisher.setState({
        mode: 'submit',
        query: target.textContent
      });
    } else {
      this.publisher.setState({
        mode: 'submit',
        query: target.closest('li').textContent
      });
    }
  }

  handleBtnClick(e) {
    e.preventDefault();
    this.publisher.setState({
      mode: 'submit',
      query: this.inputEl.value
    });
  }

  render({ mode, query }) {
    if (mode === 'select') this.inputEl.value = query;
    if (mode === 'submit') this.inputEl.value = '';
  }
}

export default SearchBarUI;
