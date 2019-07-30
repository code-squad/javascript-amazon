import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/subscriber.js'

class RecentKeywordsUI extends Subscriber {
  constructor({ stateManager, config }) {
    super();
    this.init(stateManager, config);
    this.selectedElementColor = config.selectedElementColor;
  }

  init(publisher, config) {
    this.subscribe('recentKeywordsUI', publisher);
    this.renderWrapper(config.searchFormSelector);
    this.targetEl = _.$('.recent-keywords');
  }

  renderWrapper(selector) {
    const tpl = `<ul class='recent-keywords'></ul>`;
    _.$(selector).insertAdjacentHTML('beforeend', tpl);
  }

  render(state) {
    const actionMap = {
      recentKeywords: (state) => this.renderRecentKeywords(state),
      suggestion: () => this.renderBlank(),
      selection: (state) => this.renderSelection(state),
      waiting: () => this.renderBlank()
    }
    actionMap[state.mode](state);
  }

  renderSelection({ prevIdx, selectedIdx }) {
    const ul = this.targetEl;
    const lists = ul.children;
    if (!lists.length) return;

    const prevEl = lists[prevIdx];
    if (prevEl) _.setCssStyle(prevEl, 'all', 'none');

    const selectedEl = lists[selectedIdx];
    selectedEl.focus();
    _.setCssStyle(selectedEl, 'backgroundColor', this.selectedElementColor);
  }

  renderRecentKeywords(state) {
    const recentKeywords = state.recentKeywords;
    if (!recentKeywords.length) return;

    const tpl = recentKeywords.reduce((acc, curr) => {
      return acc + `<li class='keywords' tabindex=-1>${curr}</li>`
    }, '');

    this.targetEl.innerHTML = tpl;
  }

  renderBlank() {
    this.targetEl.innerHTML = ``;
  }
}

export default RecentKeywordsUI;