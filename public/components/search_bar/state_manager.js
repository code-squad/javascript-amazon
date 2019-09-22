/* eslint-disable class-methods-use-this */
import * as _ from '../../utils/allenibrary.js';
import Publisher from '../../utils/publisher.js';
import { INITIAL_IDX, MAX_SUGGESTIONS } from './constants.js';

class StateManager extends Publisher {
  constructor({ config }) {
    super();
    this.state = {
      mode: 'submit',
      recentKeywords: config.initialRecentKeywords,
      suggestions: {},
      selectedIdx: INITIAL_IDX,
      prevIdx: INITIAL_IDX,
      userInput: '',
      query: ''
    };
    this.config = {
      url: config.url,
      suggestionDelay: config.suggestionDelay,
      maxRecentKeywords: config.maxRecentKeywords
    };
  }

  setState(state) {
    if (state.mode === 'suggest' || state.mode === 'recent') {
      this.state.prevMode = state.mode;
    }
    const config = this.config;
    const initialIdx = INITIAL_IDX;
    const maxSuggestions = MAX_SUGGESTIONS;

    const actionMap = {
      recent: params => this.processRecentMode(params),
      suggest: params => this.processSuggestMode(params),
      submit: params => this.processSubmitMode(params),
      select: params => this.processSelectMode(params)
    };

    actionMap[state.mode]({ state, config, initialIdx, maxSuggestions });
  }

  processRecentMode({ state, initialIdx }) {
    this.state = {
      ...this.state,
      ...state,
      selectedIdx: initialIdx,
      maxIdx: this.state.recentKeywords.length - 1
    };
    super.notify(this.state);
  }

  processSuggestMode({ state, config, initialIdx, maxSuggestions }) {
    this.state = {
      ...this.state,
      ...state,
      selectedIdx: initialIdx,
      maxIdx: maxSuggestions - 1
    };
    const prefix = this.state.userInput;

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
    let body = {};
    const targetUrl = new URL(url);

    targetUrl.search = new URLSearchParams({ prefix });

    try {
      const response = await fetch(targetUrl);

      if (!response.ok) throw Error(`${response.status}_ERROR`);
      body = await response.json();
    } catch (err) {
      super.notify(this.state);
      return;
    }
    this.state = this.updateSuggestions(body.suggestions, prefix, this.state);
    await _.makeDelay(suggestionDelay);
    super.notify(this.state);
  }

  updateSuggestions(suggestions, prefix, state) {
    const newState = { ...state };

    newState.suggestions[prefix] = suggestions.map(el => el.value);
    return newState;
  }

  processSubmitMode({ state, config: { maxRecentKeywords } }) {
    const newState = { ...this.state, ...state };

    this.state = this.updateRecentKeywords(newState, maxRecentKeywords);
    super.notify(this.state);
  }

  updateRecentKeywords(state, maxRecentKeywords) {
    let { query } = state;

    if (!query) query = this.getquery(state);
    const recentKeywords = [...state.recentKeywords];

    if (!query) return state;

    query = query.trim();
    if (recentKeywords.includes(query)) {
      recentKeywords.splice(recentKeywords.indexOf(query), 1);
    }
    if (recentKeywords.length >= maxRecentKeywords) {
      recentKeywords.pop();
    }
    recentKeywords.unshift(query);
    state.recentKeywords = recentKeywords;
    return state;
  }

  getquery(state) {
    const { prevMode, recentKeywords, suggestions, userInput, selectedIdx } = state;

    if (prevMode === 'recent') return recentKeywords[selectedIdx];
    if (this.hasCachedSuggestion(userInput)) return suggestions[userInput][selectedIdx];
    return userInput;
  }

  processSelectMode({ state }) {
    const newState = { ...this.state, ...state };

    this.state = this.updateSelectedIdx(newState);
    this.state.query = this.getquery(this.state);
    super.notify(this.state);
  }

  updateSelectedIdx(state) {
    const newState = { ...state };

    newState.prevIdx = newState.selectedIdx;

    const directionMap = {
      down: () => this.setSelectedIdx(newState, newState.maxIdx, 0, 'down'),
      up: () => this.setSelectedIdx(newState, 0, newState.maxIdx, 'up')
    };

    return directionMap[newState.arrowDirection]();
  }

  setSelectedIdx(state, fromIdx, toIdx, direction) {
    const increment = direction === 'down' ? 1 : -1;

    if (state.selectedIdx === fromIdx || state.selectedIdx < 0) state.selectedIdx = toIdx;
    else state.selectedIdx += increment;
    return state;
  }
}

export default StateManager;
