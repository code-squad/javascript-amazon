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
    if (state.mode === 'recentKeywords') {
      this.targetEl.innerHTML = ``;
    }
    else if (state.mode === 'suggestion') {
      if (!state.suggestions[state.currentValue]) return;
      const suggestions = [...state.suggestions[state.currentValue]];
      const tpl = suggestions.reduce((acc, curr) => {
        return acc + `<li tabindex=-1>${curr}</li>`
      }, '');
      this.targetEl.innerHTML = `<ul>${tpl}</ul>`;
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
    else if (state.mode === 'waiting') {
      this.targetEl.innerHTML = ``;
    }
  }

}

export default SuggestionUI;