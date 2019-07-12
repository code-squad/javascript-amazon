import * as _ from '../../utils/allenibrary.js'
import Publisher from '../../utils/Publisher.js'
import { AUTO_COMPLETE_DELAY } from '../constants.js'

class StateManager extends Publisher {
  constructor(keywords) {
    super();
    this.state = {
      mode: 'waiting',
      recentKeywords: new Map(keywords),
      suggestions: {}
    }
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    const actionMap = {
      recentKeywords: () => this.processRecentKeywordsMode(),
      suggestion: () => this.processSuggestionMode(),
      waiting: () => this.processWaitingMode()
    }
    actionMap[this.state.mode]();
  }

  processRecentKeywordsMode() {
    this.notify('recentKeywordsUI', this.state);
  }

  processSuggestionMode() {
    const prefix = this.state.currentValue;
    if (this.state.suggestions[prefix]) {
      setTimeout(() => {
        this.notify('recentKeywordsUI', this.state);
        this.notify('suggestionUI', this.state);
      }, AUTO_COMPLETE_DELAY);
    }
    else {
      _.getJsonData(`suggestion_keywords/${prefix}.json`)
        .then(data => {
          this.state = this.updateSuggestions(data.suggestions, prefix, this.state);
          setTimeout(() => {
            this.notify('recentKeywordsUI', this.state);
            this.notify('suggestionUI', this.state);
          }, AUTO_COMPLETE_DELAY);
        })
        .catch(reason => console.log(reason));
    }
  }

  processWaitingMode() {
    this.notify('suggestionUI', this.state);
  }

  updateSuggestions(suggestions, prefix, state) {
    const newState = { ...state };
    newState.suggestions[prefix] = suggestions.map(el => el.value);
    return newState;
  }
}

export default StateManager;