import * as ut from '../../../lib/myUtil/myUtil.js'
import template from './template/Template.js';
import { CLASS_RECENT_SEARCH,  CLASS_AUTOVIEW_LIST } from '../helper/config.js';

export default class recentSearchView {
  constructor() {
    this.autoViewContainer = null;
    this.recentSearch = null;
  }

  initRender(autoViewContainer) {
    this.autoViewContainer = autoViewContainer;
    this.attachAutocomContainer(CLASS_RECENT_SEARCH);
    this.recentSearch = ut.qsByClass(CLASS_RECENT_SEARCH, this.autoViewContainer);
  }
  
  attachAutocomContainer(className) {
    const recentSearch = template.createAutoView(className);
    ut.appendHTMLAtLast(this.autoViewContainer, recentSearch);
  }

  render(recentSearches) {
    const recentSearchesTpl = recentSearches.reduce((acc, cur) => {
      return acc+template.createAutoViewItem(cur, cur, CLASS_AUTOVIEW_LIST);
    },"")
    ut.appendHTMLAtLast(this.recentSearch, recentSearchesTpl);
  }
  
  recentSearchViewer(action) {
    const recentSearhcCL = this.recentSearch.classList;
    if(action === 'hide') recentSearhcCL.add('hide');
    else recentSearhcCL.remove('hide');
  }

  showAutoView() {
    this.recentSearch.classList.remove('hide');
  }

  getRecentSearchList() {
    return this.recentSearch.children;
  }
  
  removeRecentSearchList() {
    this.recentSearch.innerHTML = '';
  }
}