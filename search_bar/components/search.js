import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/Subscriber.js'
import { COMPONENTS_NAME } from '../constants.js'

class Search extends Subscriber {
  constructor(publisher, selector) {
    super();
    this.init(publisher);
    this.addFocusEvent(selector);
    this.addKeydownEvent(selector);
  }

  init(publisher) {
    this.subscribe(COMPONENTS_NAME.SEARCH, publisher);
  }

  addFocusEvent(selector) {
    _.on(_.$(selector), 'focus', this.handleFocus.bind(this));
  }

  handleFocus() {
    this.publisher.setState({ mode: 'recentKeywords' })
  }

  addKeydownEvent(selector) {
    _.on(_.$(selector), 'keydown', this.handleKeydown.bind(this));
  }

  handleKeydown({ target }) {
    this.publisher.setState({ mode: 'waiting', currentValue: target.value });
  }

}

export default Search;