import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/Subscriber.js'
import { COMPONENTS_NAME } from '../constants.js'

class Search extends Subscriber {
  constructor(publisher) {
    super();
    this.init(publisher);
  }

  init(publisher) {
    this.subscribe(COMPONENTS_NAME.SEARCH, publisher);
  }

}

export default Search;