import * as _ from '../utils/allenibrary.js'
import AutoComplete from './components/auto_complete.js'
import RecentKeywords from './components/recent_keywords.js'
import Search from './components/search.js'
import StateManager from './components/state_manager.js'

const stateManager = new StateManager();
const search = new Search(stateManager);
const recentKeywords = new RecentKeywords(stateManager);
const autoComplete = new AutoComplete(stateManager);