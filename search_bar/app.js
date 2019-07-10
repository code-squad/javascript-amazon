import * as _ from '../utils/allenibrary.js'
import AutoComplete from './components/auto_complete.js'
import RecentKeywords from './components/recent_keywords.js'
import Search from './components/search.js'
import StateManager from './components/state_manager.js'

const input = 'input'; //TODO: className 부여해서 별도 설정파일로 분리
const keywords = ['iphone', 'code squad', 'javascript', 'macbook pro', 'crong']; //TODO: 별도로 분리

const stateManager = new StateManager(keywords);
const search = new Search(stateManager, input);
const recentKeywords = new RecentKeywords(stateManager);
const autoComplete = new AutoComplete(stateManager);