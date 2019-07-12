import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/Subscriber.js'

class RecentKeywordsUI extends Subscriber {
  constructor(publisher, selector) {
    super();
    this.init(publisher, selector);
  }

  init(publisher, selector) {
    this.targetEl = _.$(selector);
    this.subscribe('recentKeywordsUI', publisher);
  }

  render(state) {
    if (state.mode === 'recentKeywords') {
      this.targetEl.classList.add('visible');

      const recentKeywords = [...state.recentKeywords.values()];
      const tpl = recentKeywords.reduce((acc, curr) => {
        return acc + `<li>${curr}</li>`
      }, '');

      this.targetEl.innerHTML = tpl;
    }
    else if (state.mode === 'suggestion') {

    }
    else if (state.mode === 'waiting') {

    }
  }
}

export default RecentKeywordsUI;