import * as _ from '../../utils/allenibrary.js'
import Publisher from '../../utils/Publisher.js'
import { COMPONENTS_NAME, AUTO_COMPLETE_DELAY } from '../constants.js'

class StateManager extends Publisher {
  constructor(keywords) {
    super();
    this.state = {
      mode: 'waiting',
      recentKeywords: new Map(keywords)
    }
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    if (this.state.mode === 'recentKeywords') {
      this.notify(COMPONENTS_NAME.RECENT_KEYWORDS, this.state);
    }
    else if (this.state.mode === 'suggestion') {
      this.notify(COMPONENTS_NAME.RECENT_KEYWORDS, this.state);
      this.notify(COMPONENTS_NAME.AUTO_COMPLETE, this.state);
    }
    else if (this.state.mode === 'waiting') {
      this.notify(COMPONENTS_NAME.RECENT_KEYWORDS, this.state);
    }
  }
}

export default StateManager;