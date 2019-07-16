import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/Subscriber.js'

class SearchBarUI extends Subscriber {
  constructor(publisher, selector) {
    super();
    this.inputEl = _.$(selector);
    this.init(publisher);
    this.addFocusEvent(selector);
    this.addKeyupEvent(selector);
  }

  init(publisher) {
    this.subscribe('searchBarUI', publisher);
    this.addArrowControlEvent();
  }

  addFocusEvent(selector) {
    _.on(_.$(selector), 'focus', this.handleFocus.bind(this));
  }

  handleFocus() {
    this.publisher.setState({ mode: 'recentKeywords' });
  }

  addKeyupEvent(selector) {
    _.on(_.$(selector), 'keyup', this.handleKeyup.bind(this));
  }

  handleKeyup({ target, key }) {
    if (key.length === 1 || key === 'Backspace') {
      this.publisher.setState({ mode: 'suggestion', currentValue: target.value });
    }
  }

  addArrowControlEvent() {
    _.on(document, 'keydown', this.handleKeydown.bind(this));
  }

  handleKeydown({ target, key }) {
    const keyMap = {
      ArrowDown: () => this.publisher.setState({ mode: 'selection', arrowDirection: 'down' }),
      ArrowUp: () => this.publisher.setState({ mode: 'selection', arrowDirection: 'up' }),
      Enter: () => this.publisher.setState({ mode: 'waiting', selectedValue: target.textContent })
    };
    if (keyMap[key]) keyMap[key]();
  }

  render(state) {
    this.inputEl.value = state.selectedValue;
  }
}

export default SearchBarUI;