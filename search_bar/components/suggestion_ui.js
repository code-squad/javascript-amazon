import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/subscriber.js'
import { SELECTED_EL_COLOR } from '../constants.js'

class SuggestionUI extends Subscriber {
  constructor(publisher, selector) {
    super();
    this.init(publisher, selector);
  }

  init(publisher, selector) {
    this.subscribe('suggestionUI', publisher);
    this.renderWrapper(selector);
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
    const suggestions = state.suggestions[state.currentValue];
    if (!suggestions) return;
    const tpl = suggestions.reduce((acc, curr) => {
      curr = curr.replace(prefix, '');
      return acc + `<li class='suggestions' tabindex=-1>${prefix}<b>${curr}</b></li>`
    }, '');
    this.targetEl.innerHTML = tpl;
  }

  renderSelection(state) {
    const ul = this.targetEl;
    const lists = ul.children;
    if (!lists.length) return;
    const prevEl = lists[state.prevIdx];
    if (prevEl) prevEl.style = {};

    const selectedEl = lists[state.selectedIdx];
    selectedEl.focus();
    selectedEl.style.backgroundColor = SELECTED_EL_COLOR;
  }

  renderBlank() {
    this.targetEl.innerHTML = ``;
  }
}

export default SuggestionUI;