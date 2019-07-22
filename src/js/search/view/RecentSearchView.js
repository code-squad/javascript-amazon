import ut from '../../myUtil/myUtil.js'
import template from './template/Template.js';

export default class recentSearchView {
  constructor() {
    this.autoViewContainer = null;
    this.recentSearch = null;
    this.recentSearchExt = false;
  }

  initRender(autoViewContainer) {
    this.autoViewContainer = autoViewContainer;
    const className = "search__recent-search";
    this.attachAutocomContainer(className);
    this.recentSearch = ut.qrSelectorByClass(className, this.autoViewContainer);
  }

  render(recentSearches) {
    this.informRecentSearchMade();
    const recentSearchesTpl = recentSearches.reduce((acc, cur) => {
      return acc+template.createAutoViewItem(cur, cur);
    },"")
    ut.appendElLastly(this.recentSearch, recentSearchesTpl);
  }
  
  attachAutocomContainer(className) {
    const recentSearch = template.createAutoView(className);
    ut.appendElLastly(this.autoViewContainer, recentSearch);
  }
  
  recentSearchViewer(action) {
    const recentSearhcCL = this.recentSearch.classList
    if(action === 'hide') recentSearhcCL.add('hide');
    else recentSearhcCL.remove('hide');
  }
    
  informRecentSearchMade() {
    this.recentSearchExt = true;
  }

  recentSearchChecker() {
    return this.recentSearchExt;
  }

  showAutoView() {
    this.recentSearch.classList.remove('hide');
  }

  getRecentSearchList() {
    return this.recentSearch.children;
  }
  
}