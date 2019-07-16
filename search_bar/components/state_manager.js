import * as _ from '../../utils/allenibrary.js'
import Publisher from '../../utils/Publisher.js'
import { AUTO_COMPLETE_DELAY, MAXIMUM_SUGGESTIONS, INITIAL_SELECTED_IDX } from '../constants.js'

class StateManager extends Publisher {
  constructor(keywords) {
    super();
    this.state = {
      mode: 'waiting',
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
    this.state = { ...this.state, selectedIdx: INITIAL_SELECTED_IDX, maxIdx: this.state.recentKeywords.size - 1 };
    this.notify(this.state);
  }

  processSuggestionMode() {
    this.state = { ...this.state, selectedIdx: INITIAL_SELECTED_IDX, maxIdx: MAXIMUM_SUGGESTIONS - 1 };
    const prefix = this.state.currentValue;
    if (prefix === '') return;
    if (this.state.suggestions[prefix]) {
      setTimeout(() => {
        this.notify(this.state);
      }, AUTO_COMPLETE_DELAY);
    }
    else {
      _.getJsonData(`suggestion_keywords/${prefix}.json`)
        .then(data => {
          this.state = this.updateSuggestions(data.suggestions, prefix, this.state);
          setTimeout(() => {
            this.notify(this.state);
          }, AUTO_COMPLETE_DELAY);
        })
        .catch(reason => console.log(reason));
    }
  }

  updateSuggestions(suggestions, prefix, state) {
    const newState = { ...state };
    //suggestions를 카피해서 바꿔야할듯?
    newState.suggestions[prefix] = suggestions.map(el => el.value);
    return newState;
  }

  processWaitingMode() {
    this.notify(this.state);
  }

  processSelectionMode() {
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