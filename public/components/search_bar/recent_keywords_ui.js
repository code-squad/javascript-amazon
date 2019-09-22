import * as _ from '../../utils/allenibrary.js';
import Subscriber from '../../utils/subscriber.js';

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
      recent: state => this.renderRecentKeywords(state),
      suggest: () => this.renderBlank(),
      select: state => this.renderSelection(state),
      submit: () => this.renderBlank()
    };

    actionMap[state.mode](state);
  }

  renderSelection({ prevIdx, selectedIdx }) {
    const lists = this.targetEl.children;

    if (!lists.length) return;

    const prevEl = lists[prevIdx];

    if (prevEl) _.setCssStyle(prevEl, 'all', 'none');

    const selectedEl = lists[selectedIdx];

    _.setCssStyle(selectedEl, 'backgroundColor', this.selectedElementColor);
  }

  renderRecentKeywords(state) {
    const recentKeywords = state.recentKeywords;

    if (!recentKeywords.length) return;

    const tpl = recentKeywords.reduce(
      (acc, curr, i) => `${acc}<li class='keywords' data-id=${i}>${curr}</li>`,
      ''
    );

    this.targetEl.innerHTML = tpl;
  }

  renderBlank() {
    this.targetEl.innerHTML = ``;
  }
}

export default RecentKeywordsUI;
