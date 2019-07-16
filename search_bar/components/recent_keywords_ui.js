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
    const actionMap = {
      recentKeywords: (state) => this.renderRecentKeywords(state),
      suggestion: () => this.resetView(),
      selection: (state) => this.renderSelection(state),
      waiting: () => this.resetView()
    }
    actionMap[state.mode](state);
  }

  renderSelection(state) {
    const ul = this.targetEl.firstElementChild;
    if (!ul) return;
    const lists = ul.children;
    const prevEl = lists[state.prevIdx];
    if (prevEl) prevEl.style = {};

    const selectedEl = lists[state.selectedIdx];
    selectedEl.focus();
    selectedEl.style.backgroundColor = SELECTED_EL_COLOR;
  }

  renderRecentKeywords(state) {
    const recentKeywords = state.recentKeywords;
    const tpl = recentKeywords.reduce((acc, curr, idx) => {
      return acc + `<li data-idx=${idx} tabindex=-1>${curr}</li>`
    }, '');

    this.targetEl.innerHTML = `<ul class='recent-keywords'>${tpl}</ul>`;
  }

  resetView() {
    this.targetEl.innerHTML = ``;
  }
}

export default RecentKeywordsUI;