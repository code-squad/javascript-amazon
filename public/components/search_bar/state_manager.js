import * as _ from '../../utils/allenibrary.js'
import Publisher from '../../utils/publisher.js'
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
      recentKeywords: (params) => this.processRecentKeywordsMode(params),
      suggestion: (params) => this.processSuggestionMode(params),
      waiting: (params) => this.processWaitingMode(params),
      selection: (params) => this.processSelectionMode(params)
    }
    actionMap[state.mode]({ state, config, initialIdx, maxSuggestions });
  }

  processRecentKeywordsMode({ state, initialIdx }) {
    this.state = {
      ...this.state,
      ...state,
      selectedIdx: initialIdx,
      maxIdx: this.state.recentKeywords.length - 1
    };
    super.notify(this.state);
  }

  processSuggestionMode({ state, config, initialIdx, maxSuggestions }) {
    this.state = {
      ...this.state,
      ...state,
      selectedIdx: initialIdx,
      maxIdx: maxSuggestions - 1
    };
    const prefix = this.state.currentValue;
    this.hasCachedSuggestion(prefix)
      ? this.notifyCachedSuggestions(config)
      : this.fetchSuggestions(prefix, config);
  }

  hasCachedSuggestion(prefix) {
    return this.state.suggestions[prefix];
  }

  async notifyCachedSuggestions({ suggestionDelay }) {
    await _.makeDelay(suggestionDelay);
    super.notify(this.state);
  }

  async fetchSuggestions(prefix, { url, suggestionDelay }) {
    let data = {};
    try {
      data = await _.getJsonData(`${url}${prefix}`);
      if (data.statusCode === 404) throw Error('404, NO_SUGGESTIONS');
      if (data.statusCode !== 200) throw Error(`${data.statusCode}_ERROR`)
    }
    catch ({ message }) {
      console.log(message);
      super.notify(this.state);
      return;
    }
    this.state = this.updateSuggestions(data.body.suggestions, prefix, this.state);
    await _.makeDelay(suggestionDelay);
    super.notify(this.state);
  }

  updateSuggestions(suggestions, prefix, state) {
    const newState = { ...state };
    newState.suggestions[prefix] = suggestions.map(el => el.value);
    return newState;
  }

  processWaitingMode({ state, config: { maxRecentKeywords } }) {
    this.state = { ...this.state, ...state };
    this.state = this.updateRecentKeywords(this.state, maxRecentKeywords);
    super.notify(this.state);
  }

  updateRecentKeywords(state, maxRecentKeywords) {
    let currentValue = state.currentValue;
    const newKeywords = [...state.recentKeywords];

    if (!currentValue) return state;

    currentValue = currentValue.trim();
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

  processSelectionMode({ state }) {
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