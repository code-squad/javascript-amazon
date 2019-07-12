import * as _ from '../../utils/allenibrary.js'
import Subscriber from '../../utils/subscriber.js'

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
    if (state.mode === 'suggestion') {
      const suggestions = [...state.suggestions[state.currentValue]];
      const tpl = suggestions.reduce((acc, curr) => {
        return acc + `<li>${curr}</li>`
      }, '');
      this.targetEl.innerHTML = tpl;
    }
  }

}

export default SuggestionUI;