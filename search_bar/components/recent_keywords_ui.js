import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/Subscriber.js'
import { SELECTED_EL_COLOR } from '../constants.js'

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
      // this.targetEl.classList.add('visible');

      const recentKeywords = [...state.recentKeywords.values()];
      const tpl = recentKeywords.reduce((acc, curr, idx) => {
        return acc + `<li data-idx=${idx} tabindex=-1>${curr}</li>`
      }, '');

      this.targetEl.innerHTML = `<ul class='recent-keywords'>${tpl}</ul>`;
    }
    else if (state.mode === 'selection') {
      const ul = this.targetEl.firstElementChild;
      if (!ul) return;
      const lists = ul.children;
      const prevEl = lists[state.prevIdx];
      if (prevEl) prevEl.style = {};

      const selectedEl = lists[state.selectedIdx];
      selectedEl.focus();
      selectedEl.style.backgroundColor = SELECTED_EL_COLOR;
    }
    else if (state.mode === 'suggestion') {
      this.targetEl.innerHTML = '';
    }
    else if (state.mode === 'waiting') {
      this.targetEl.innerHTML = '';
    }
  }
}

export default RecentKeywordsUI;