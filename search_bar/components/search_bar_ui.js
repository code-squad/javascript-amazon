import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/Subscriber.js'

class SearchBarUI extends Subscriber {
  constructor(publisher, { inputSelector, buttonSelector }) {
    super();
    this.inputEl = _.$(inputSelector);
    this.buttonEl = _.$(buttonSelector);
    this.init(publisher);
    this.mode = 'waiting'
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
      this.publisher.setState({ mode: 'suggestion', currentValue: target.value });
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
        if (target.className === 'suggestions' || target.className === 'keywords' || target === this.inputEl) {
          this.publisher.setState({ mode: 'waiting', selectedValue: target.textContent, currentValue: target.value });
        }
      }
    };
    if (keyMap[key]) keyMap[key]();
  }

  addClickEvent() {
    _.on(this.buttonEl, 'click', this.handleClick.bind(this));
  }

  handleClick(e) {
    e.preventDefault();
    this.publisher.setState({ mode: 'waiting', currentValue: this.inputEl.value })
  }

  render(state) {
    if ((this.mode !== state.mode) || !state.selectedValue) return;
    this.inputEl.value = state.selectedValue;
    this.inputEl.focus();
  }
}

export default SearchBarUI;