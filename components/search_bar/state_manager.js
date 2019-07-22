import * as _ from '../../utils/allenibrary.js'
import Publisher from '../../utils/Publisher.js'
import { INITIAL_IDX, MAX_SUGGESTIONS } from './constants.js'

class StateManager extends Publisher {
  constructor({ config }) {
    super();
    this.state = {
      mode: 'waiting',
      recentKeywords: [],
      suggestions: {},
      selectedIdx: INITIAL_IDX,
      prevIdx: INITIAL_IDX
    }
    this.config = {
      url: config.url,
      suggestionDelay: config.suggestionDelay,
      maxRecentKeywords: config.maxRecentKeywords
    }
  }

  setState(state) {
    const config = this.config;
    const initialIdx = INITIAL_IDX;
    const maxSuggestions = MAX_SUGGESTIONS;

    const actionMap = {
      recentKeywords: ({ state, initialIdx }) => this.processRecentKeywordsMode(state, initialIdx),
      suggestion: ({ state, config, initialIdx, maxSuggestions }) => this.processSuggestionMode(state, config, initialIdx, maxSuggestions),
      waiting: ({ state, config }) => this.processWaitingMode(state, config),
      selection: ({ state }) => this.processSelectionMode(state)
    }
    actionMap[state.mode]({ state, config, initialIdx, maxSuggestions });
  }

  processRecentKeywordsMode(state, initialIdx) {
    this.state = {
      ...this.state,
      ...state,
      selectedIdx: initialIdx,
      maxIdx: this.state.recentKeywords.length - 1
    };
    super.notify(this.state);
  }

  processSuggestionMode(state, config, initialIdx, maxSuggestions) {
    this.state = {
      ...this.state,
      ...state,
      selectedIdx: initialIdx,
      maxIdx: maxSuggestions - 1
    };
    const prefix = this.state.currentValue;
    if (this.state.suggestions[prefix]) {
      setTimeout(() => {
        super.notify(this.state);
      }, config.suggestionDelay);
    }
    else {
      _.getJsonData(`${config.url}${prefix}`)
        .then(({ body }) => {
          this.state = this.updateSuggestions(body.suggestions, prefix, this.state);
          setTimeout(() => {
            super.notify(this.state);
          }, config.suggestionDelay);
        })
        .catch(reason => {
          super.notify(this.state);
          console.log('NO_SUGGESTIONS');
        });
    }
  }

  updateSuggestions(suggestions, prefix, state) {
    const newState = { ...state };
    newState.suggestions[prefix] = suggestions.map(el => el.value);
    return newState;
  }

  processWaitingMode(state, { maxRecentKeywords }) {
    this.state = { ...this.state, ...state };
    this.state = this.updateRecentKeywords(this.state, maxRecentKeywords);
    super.notify(this.state);
  }

  updateRecentKeywords(state, maxRecentKeywords) {
    let currentValue = state.currentValue;
    if (!currentValue) return state;
    currentValue = currentValue.trim();
    const newKeywords = [...state.recentKeywords];
    if (newKeywords.includes(currentValue)) {
      newKeywords.splice(newKeywords.indexOf(currentValue), 1);
    }
    if (newKeywords.length >= maxRecentKeywords) {
      newKeywords.pop();
    }
    newKeywords.unshift(currentValue);
    state.recentKeywords = newKeywords;
    return state;
  }

  processSelectionMode(state) {
    this.state = { ...this.state, ...state }
    this.state = this.updateSelectedIdx(this.state);
    super.notify(this.state);
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