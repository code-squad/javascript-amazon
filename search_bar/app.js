import * as _ from '../utils/allenibrary.js'
import SuggestionUI from './components/suggestion_ui.js';
import RecentKeywordsUI from './components/recent_keywords_ui.js'
import SearchBarUI from './components/search_bar_ui.js'
import StateManager from './components/state_manager.js'

const input = 'input'; //TODO: className 부여해서 별도 설정파일로 분리
const selector1 = '.wrapper1';
const selector2 = '.wrapper2';

const stateManager = new StateManager();
const searchUI = new SearchBarUI(stateManager, input);
const recentKeywordsUI = new RecentKeywordsUI(stateManager, selector1);
const suggestionUI = new SuggestionUI(stateManager, selector2);