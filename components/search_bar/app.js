import SuggestionUI from './suggestion_ui.js';
import RecentKeywordsUI from './recent_keywords_ui.js'
import SearchBarUI from './search_bar_ui.js'
import StateManager from './state_manager.js'
import { config } from './config.js'

const { url, searchFormSelector, inputSelector, buttonSelector } = config;

export const initSearchBar = _ => {
  const stateManager = new StateManager({ url });
  const searchUI = new SearchBarUI(stateManager, { inputSelector, buttonSelector });

  if (config.recentKeywords) {
    const recentKeywordsUI = new RecentKeywordsUI(stateManager, searchFormSelector);
  }
  if (config.suggestion) {
    const suggestionUI = new SuggestionUI(stateManager, searchFormSelector);
  }
}