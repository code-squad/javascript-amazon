import * as _ from '../utils/allenibrary.js'
import SuggestionUI from './components/suggestion_ui.js';
import RecentKeywordsUI from './components/recent_keywords_ui.js'
import SearchBarUI from './components/search_bar_ui.js'
import StateManager from './components/state_manager.js'

const input = 'input'; //TODO: className 부여해서 별도 설정파일로 분리
const keys = ['iphone', 'code squad', 'javascript', 'macbook pro', 'crong']; //TODO: 별도로 분리
const keywords = new Map(keys.map((el, i) => [i, el])); //TODO: 별도로 분리
const div = '.lists-wrapper';

const stateManager = new StateManager(keywords);
const searchUI = new SearchBarUI(stateManager, input);
const recentKeywordsUI = new RecentKeywordsUI(stateManager, div);
const suggestionUI = new SuggestionUI(stateManager, div);