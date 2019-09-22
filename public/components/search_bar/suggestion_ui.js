import * as _ from '../../utils/allenibrary.js';
import Subscriber from '../../utils/subscriber.js';

class SuggestionUI extends Subscriber {
  constructor({ stateManager, config: { searchFormSelector, selectedElementColor } }) {
    super();
    this.init(stateManager, searchFormSelector);
    this.selectedElementColor = selectedElementColor;
  }

  init(publisher, searchFormSelector) {
    this.subscribe('suggestionUI', publisher);
    this.renderWrapper(searchFormSelector);
    this.targetEl = _.$('.auto-suggestions');
  }

  renderWrapper(selector) {
    const tpl = `<ul class='auto-suggestions'></ul>`;

    _.$(selector).insertAdjacentHTML('beforeend', tpl);
  }

  render(state) {
    const actionMap = {
      recentKeywords: () => this.renderBlank(),
      suggestion: state => this.renderSuggestion(state),
      selection: state => this.renderSelection(state),
      submit: () => this.renderBlank()
    };

    actionMap[state.mode](state);
  }

  renderSuggestion(state) {
    const prefix = state.query;

    if (!prefix) {
      this.renderBlank();
      return;
    }
    const suggestions = state.suggestions[prefix];

    if (!suggestions) {
      this.renderBlank();
      return;
    }

    const tpl = suggestions.reduce((acc, curr, i) => {
      curr = curr.replace(prefix, '');
      return `${acc}<li class='suggestions' data-id=${i}>${prefix}<b class='boldedSuggestion'>${curr}</b></li>`;
    }, '');

    this.targetEl.innerHTML = tpl;
  }

  renderSelection({ prevIdx, selectedIdx }) {
    const lists = this.targetEl.children;

    if (!lists.length) return;

    const prevEl = lists[prevIdx];

    if (prevEl) _.setCssStyle(prevEl, 'all', 'none');

    const selectedEl = lists[selectedIdx];

    _.setCssStyle(selectedEl, 'backgroundColor', this.selectedElementColor);
  }

  renderBlank() {
    this.targetEl.innerHTML = ``;
  }
}

export default SuggestionUI;
