import * as _ from '../../utils/allenibrary.js'
import Publisher from '../../utils/Publisher.js'
import { COMPONENTS_NAME, AUTO_COMPLETE_DELAY } from '../constants.js'

class StateManager extends Publisher {
  constructor() {
    super();
    this.state = {
    }
  }
}

export default StateManager;