import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/Subscriber.js'

class SearchBarUI extends Subscriber {
  constructor(publisher, selector) {
    super();
    this.init(publisher);
    this.addFocusEvent(selector);
    this.addKeydownEvent(selector);
  }

  init(publisher) {
    this.subscribe('searchBarUI', publisher);
  }

  addFocusEvent(selector) {
    _.on(_.$(selector), 'focus', this.handleFocus.bind(this));
  }

  handleFocus() {
    this.publisher.setState({ mode: 'recentKeywords' });
  }

  addKeydownEvent(selector) {
    _.on(_.$(selector), 'keyup', this.handleKeydown.bind(this));
  }

  handleKeydown({ target, key }) {
    if (key.length === 1 || key === 'Backspace') {
      this.publisher.setState({ mode: 'suggestion', currentValue: target.value });
    }
  }
}

export default SearchBarUI;