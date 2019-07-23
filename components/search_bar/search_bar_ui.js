import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/Subscriber.js'

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
  }

  addFocusEvent() {
    _.on(this.inputEl, 'focus', this.handleFocus.bind(this));
  }

  handleFocus() {
    this.publisher.setState({ mode: 'recentKeywords' });
  }

  addKeyupEvent() {
    _.on(this.inputEl, 'keyup', this.handleKeyup.bind(this));
  }

  handleKeyup({ target, key }) {
    if (key.length === 1 || key === 'Backspace') {
      const param = { mode: 'suggestion', currentValue: target.value };
      _.setDebounce((p) => this.publisher.setState(p), 1200, param);
    }
  }

  addKeydownEvent() {
    _.on(document, 'keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(e) {
    const { target, key } = e;
    const keyMap = {
      ArrowDown: () => this.publisher.setState({ mode: 'selection', arrowDirection: 'down' }),
      ArrowUp: () => this.publisher.setState({ mode: 'selection', arrowDirection: 'up' }),
      Enter: () => {
        e.preventDefault();
        if (this.isValidTarget(target)) {
          this.publisher.setState({ mode: 'waiting', selectedValue: target.textContent, currentValue: target.value });
        }
      }
    };
    if (keyMap[key]) keyMap[key]();
  }

  isValidTarget(target) {
    return target.className === 'suggestions' || target.className === 'keywords' || target === this.inputEl;
  }

  addClickEvent() {
    _.on(this.buttonEl, 'click', this.handleClick.bind(this));
  }

  handleClick(e) {
    e.preventDefault();
    this.publisher.setState({ mode: 'waiting', currentValue: this.inputEl.value })
  }

  render({ mode, selectedValue }) {
    if ((mode !== 'waiting') || !selectedValue) return;
    this.inputEl.value = selectedValue;
    this.inputEl.focus();
  }
}

export default SearchBarUI;