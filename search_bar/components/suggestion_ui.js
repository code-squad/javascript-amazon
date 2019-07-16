import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/subscriber.js'
import { SELECTED_EL_COLOR } from '../constants.js'

class SuggestionUI extends Subscriber {
  constructor(publisher, selector) {
    super();
    this.init(publisher, selector);
  }

  init(publisher, selector) {
    this.targetEl = _.$(selector);
    this.subscribe('suggestionUI', publisher);
  }

  render(state) {
    const actionMap = {
      recentKeywords: () => this.resetView(),
      suggestion: (state) => this.renderSuggestion(state),
      selection: (state) => this.renderSelection(state),
      waiting: () => this.resetView()
    }
    actionMap[state.mode](state);
  }

  renderSuggestion(state) {
    const prefix = state.currentValue;
    const suggestions = state.suggestions[state.currentValue];
    if (!suggestions) return;
    const tpl = suggestions.reduce((acc, curr) => {
      curr = curr.replace(prefix, '');
      return acc + `<li tabindex=-1>${prefix}<b>${curr}</b></li>`
    }, '');
    this.targetEl.innerHTML = `<ul>${tpl}</ul>`;
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

  resetView() {
    this.targetEl.innerHTML = ``;
  }

}

export default SuggestionUI;