import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/subscriber.js'
import { COMPONENTS_NAME } from '../constants.js'

class AutoComplete extends Subscriber {
  constructor(publisher) {
    super();
    this.init(publisher);
  }

  init(publisher) {
    this.subscribe(COMPONENTS_NAME.AUTO_COMPLETE, publisher);
  }

}

export default AutoComplete;