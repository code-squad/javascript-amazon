import ut from '../../myUtil/myUtil.js'
import template from './template/Template.js';

export default class recentSearchView {
  constructor() {
    this.autoViewContainer = null;
    this.recentSearch = null;
  }

  initRender(autoViewContainer) {
    this.autoViewContainer = autoViewContainer;
    const className = "search__recent-search";
    this.attachAutocomContainer(className);
    this.recentSearch = ut.qrSelectorByClass(className, this.autoViewContainer);
  }
  
  attachAutocomContainer(className) {
    const recentSearch = template.createAutoView(className);
    ut.appendElLastly(this.autoViewContainer, recentSearch);
  }

  render(recentSearches) {
    // this.informRecentSearchMade();
    const recentSearchesTpl = recentSearches.reduce((acc, cur) => {
      return acc+template.createAutoViewItem(cur, cur);
    },"")
    ut.appendElLastly(this.recentSearch, recentSearchesTpl);
  }
  
  recentSearchViewer(action) {
    const recentSearhcCL = this.recentSearch.classList
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