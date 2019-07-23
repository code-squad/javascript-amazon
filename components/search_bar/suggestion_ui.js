import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/subscriber.js'

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
      suggestion: (state) => this.renderSuggestion(state),
      selection: (state) => this.renderSelection(state),
      waiting: () => this.renderBlank()
    }
    actionMap[state.mode](state);
  }

  renderSuggestion(state) {
    const prefix = state.currentValue;
    if (!prefix) {
      this.renderBlank();
      return;
    }
    const suggestions = state.suggestions[prefix];
    if (!suggestions) {
      this.renderBlank();
      return;
    }

    const tpl = suggestions.reduce((acc, curr) => {
      curr = curr.replace(prefix, '');
      return acc + `<li class='suggestions' tabindex=-1>${prefix}<b>${curr}</b></li>`
    }, '');
    this.targetEl.innerHTML = tpl;
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

  renderBlank() {
    this.targetEl.innerHTML = ``;
  }
}

export default SuggestionUI;