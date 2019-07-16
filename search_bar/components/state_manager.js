import * as _ from '../../utils/allenibrary.js'
import Publisher from '../../utils/Publisher.js'
import { AUTO_COMPLETE_DELAY } from '../constants.js'

class StateManager extends Publisher {
  constructor(keywords) {
    super();
    this.state = {
      mode: 'waiting',
      // prevMode: 'waiting',
      recentKeywords: new Map(keywords),
      suggestions: {},
      selectedIdx: -1,
      prevIdx: -1
    }
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    const actionMap = {
      recentKeywords: () => this.processRecentKeywordsMode(),
      suggestion: () => this.processSuggestionMode(),
      waiting: () => this.processWaitingMode(),
      selection: () => this.processSelectionMode()
    }
    actionMap[this.state.mode]();
  }

  processRecentKeywordsMode() {
    this.state = { ...this.state, selectedIdx: -1, maxIdx: this.state.recentKeywords.size - 1 }
    this.notify('recentKeywordsUI', this.state);
    this.notify('suggestionUI', this.state);
  }

  processSuggestionMode() {
    this.state = { ...this.state, selectedIdx: -1, maxIdx: 10 } //TODO: 매직넘버제거
    const prefix = this.state.currentValue;
    if (prefix === '') return;
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
    this.notify('searchBarUI', this.state);
    this.notify('suggestionUI', this.state);
    this.notify('recentKeywordsUI', this.state);
  }

  processSelectionMode() {
    this.state = this.updateSelectedIdx(this.state);
    this.notify('suggestionUI', this.state);
    this.notify('recentKeywordsUI', this.state);
  }

  updateSelectedIdx(state) {
    const newState = { ...state };
    newState.prevIdx = newState.selectedIdx;

    const directionMap = {
      down: () => this.setSelectedIdx(newState, newState.maxIdx, 0, 1),
      up: () => this.setSelectedIdx(newState, 0, newState.maxIdx, -1)
    }
    directionMap[newState.arrowDirection]();

    return newState;
  }

  setSelectedIdx(state, fromIdx, toIdx, diff) {
    if (state.selectedIdx === fromIdx) state.selectedIdx = toIdx;
    else state.selectedIdx += diff;
    return state;
  }

  updateSuggestions(suggestions, prefix, state) {
    const newState = { ...state };
    //suggestions를 카피해서 바꿔야할듯?
    newState.suggestions[prefix] = suggestions.map(el => el.value);
    return newState;
  }
}

export default StateManager;