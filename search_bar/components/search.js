import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/Subscriber.js'
import { COMPONENTS_NAME } from '../constants.js'

class Search extends Subscriber {
  constructor(publisher, selector) {
    super();
    this.init(publisher);
    this.addKeydownEvent(selector)
  }

  init(publisher) {
    this.subscribe(COMPONENTS_NAME.SEARCH, publisher);
  }

  addKeydownEvent(selector) {
    _.on(_.$(selector), 'keydown', this.handleKeydown.bind(this));
  }

  handleKeydown({ target }) {
    this.publisher.setState({ currentValue: target.value });
  }

}

export default Search;