import SuggestionUI from './suggestion_ui.js';
import RecentKeywordsUI from './recent_keywords_ui.js'
import SearchBarUI from './search_bar_ui.js'
import StateManager from './state_manager.js'
import config from './config.js'


export const initSearchBar = _ => {
  const stateManager = new StateManager({ config });
  const searchBarUI = new SearchBarUI({ stateManager, config });

  const recentKeywordsUI = new RecentKeywordsUI({ stateManager, config });
  const suggestionUI = new SuggestionUI({ stateManager, config });
}