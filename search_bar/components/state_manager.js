import * as _ from '../../utils/allenibrary.js'
import Publisher from '../../utils/Publisher.js'
import { SUGGESTION_DELAY, MAXIMUM_SUGGESTIONS, MAXIMUM_RECENT_KEYWORDS, INITIAL_SELECTED_IDX } from '../constants.js'

class StateManager extends Publisher {
  constructor({ keywords = [], url }) {
    super();
    this.state = {
      mode: 'waiting',
      recentKeywords: keywords,
      suggestions: {},
      selectedIdx: INITIAL_SELECTED_IDX,
      prevIdx: INITIAL_SELECTED_IDX,
      url: url
    }
  }

  setState(state) {
    const actionMap = {
      recentKeywords: (state) => this.processRecentKeywordsMode(state),
      suggestion: (state) => this.processSuggestionMode(state),
      waiting: (state) => this.processWaitingMode(state),
      selection: (state) => this.processSelectionMode(state)
    }
    actionMap[state.mode](state);
  }

  processRecentKeywordsMode(state) {
    this.state = {
      ...this.state,
      ...state,
      selectedIdx: INITIAL_SELECTED_IDX,
      maxIdx: this.state.recentKeywords.length - 1
    };
    this.notify(this.state);
  }

  processSuggestionMode(state) {
    this.state = {
      ...this.state,
      ...state,
      selectedIdx: INITIAL_SELECTED_IDX,
      maxIdx: MAXIMUM_SUGGESTIONS - 1,
    };
    const prefix = this.state.currentValue;
    if (this.state.suggestions[prefix]) {
      setTimeout(() => {
        this.notify(this.state);
      }, SUGGESTION_DELAY);
    }
    else {
      _.getJsonData(`${this.state.url}${prefix}`)
        .then(data => {
          this.state = this.updateSuggestions(data.body.suggestions, prefix, this.state);
          setTimeout(() => {
            this.notify(this.state);
          }, SUGGESTION_DELAY);
        })
        .catch(reason => {
          this.notify(this.state);
          console.log('NO_SUGGESTIONS');
        });
    }
  }

  updateSuggestions(suggestions, prefix, state) {
    const newState = { ...state };
    newState.suggestions[prefix] = suggestions.map(el => el.value);
    return newState;
  }

  processWaitingMode(state) {
    this.state = { ...this.state, ...state };
    this.state = this.updateRecentKeywords(this.state);
    this.notify(this.state);
  }

  updateRecentKeywords(state) {
    let currentValue = state.currentValue;
    if (!currentValue) return state;
    currentValue = currentValue.trim();
    const newKeywords = [...state.recentKeywords];
    if (newKeywords.includes(currentValue)) {
      newKeywords.splice(newKeywords.indexOf(currentValue), 1);
    }
    if (newKeywords.length >= MAXIMUM_RECENT_KEYWORDS) {
      newKeywords.pop();
    }
    newKeywords.unshift(currentValue);
    state.recentKeywords = newKeywords;
    return state;
  }

  processSelectionMode(state) {
    this.state = { ...this.state, ...state }
    this.state = this.updateSelectedIdx(this.state);
    this.notify(this.state);
  }

  updateSelectedIdx(state) {
    const newState = { ...state };
    newState.prevIdx = newState.selectedIdx;

    const directionMap = {
      down: () => this.setSelectedIdx(newState, newState.maxIdx, 0, 'down'),
      up: () => this.setSelectedIdx(newState, 0, newState.maxIdx, 'up')
    }
    return directionMap[newState.arrowDirection]();
  }

  setSelectedIdx(state, fromIdx, toIdx, direction) {
    const increment = direction === 'down' ? 1 : -1;
    if (state.selectedIdx === fromIdx) state.selectedIdx = toIdx;
    else state.selectedIdx += increment;
    return state;
  }
}

export default StateManager;