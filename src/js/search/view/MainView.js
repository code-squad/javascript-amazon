import ut from '../../myUtil/myUtil.js'
import template from './template/Template.js';
import config from '../helper/config.js';

export default class MainView {
  constructor({autocompleteView, recentSearchView, inputBox, searchBar}) {
    this.inputBox = inputBox;
    this.searchBar = searchBar;
    this.autocompleteView = autocompleteView;
    this.recentSearchView = recentSearchView;
    this.autoViewContainer = null;
    this.autoViewItems = null;
    this.numOfAutoView = null;
    this.curFocusedIdx = null;
    this.focusedDom = null;
    this.initRender();
  }

  initRender() {
    this.renderAutoViewContainer();
    this.recentSearchView.initRender(this.autoViewContainer);
    this.autocompleteView.initRender(this.autoViewContainer);
    this.autoViewViewer('all', 'hide');
  }
  
  getSearchBar() {
    return this.searchBar;
  }

  renderAutoViewContainer() {
    const { autoView } = config.class;
    const autoViewContainer = template.createAutoViewContainer(autoView);
    ut.appendElLastly(this.inputBox, autoViewContainer);
    this.autoViewContainer = ut.qrSelectorByClass(autoView, this.input)
  }
  
  renderAutocomList(matchedWords, value) {
    this.autocompleteView.deleteRenderedList();
    this.autocompleteView.render(matchedWords, value);
    this.autoViewViewer('autocom', 'show');
    this.autoViewItems = this.autocompleteView.getAutocomList();
  }
  
  deleteAutocomList() {
    this.autoViewViewer('autocom', 'hide');
    this.autocompleteView.deleteRenderedList();
  }

  renderRecentSearch(recentSearches) {
    if(!recentSearches.length) return;
    this.recentSearchView.removeRecentSearchList();
    this.recentSearchView.render(recentSearches);
    this.autoViewViewer('recentSearch', 'show');
    this.autoViewItems = this.recentSearchView.getRecentSearchList();
  }

  autoViewViewer(viewType, action){
    this.focusToggle();
    this.resetFocusedDom();
    this.clearAutoViewList();
    if(viewType === 'recentSearch') {
      if(action === 'show') this.autoViewItems = this.recentSearchView.getRecentSearchList();
      this.recentSearchView.recentSearchViewer(action);
      return;
    }
    if(viewType === 'autocom') {
      this.autocompleteView.autocompleteViewer(action);
      return;
    }
    if(viewType === 'all') {
      this.recentSearchView.recentSearchViewer(action);
      this.autocompleteView.autocompleteViewer(action);
      return;
    }
  }

  focusItem(keyCode) {
    if (!this.autoViewItems) return;
    this.numOfAutoView = this.autoViewItems.length;
    if(this.focusedDom === null) {
      this.firstFocus(keyCode);
    } 
    else {
      this.moveFocus(keyCode);
    }
  }
  
  firstFocus(keyCode) {
    const firstItemIdx = 0,
    lastItemIdx = this.numOfAutoView - 1;
    if(keyCode === 'ArrowDown') {
      this.focusedDom = this.autoViewItems[firstItemIdx];
      this.curFocusedIdx = firstItemIdx;
    } else {
      this.focusedDom = this.autoViewItems[lastItemIdx];
      this.curFocusedIdx = lastItemIdx;
    }
    this.focusToggle();
  }
  
  moveFocus(keyCode) {
    this.focusToggle();
    let nextItemIdx;
    keyCode === 'ArrowDown' ? nextItemIdx = this.curFocusedIdx + 1 : nextItemIdx = this.curFocusedIdx - 1;
    if(nextItemIdx < 0 || nextItemIdx >= this.numOfAutoView) {
      this.resetFocusedDom();
      return;
    }
    this.focusedDom = this.autoViewItems[nextItemIdx];
    this.curFocusedIdx = nextItemIdx;
    this.focusToggle();
  }
  
  focusToggle() {
    if(!this.focusedDom) return;
    this.focusedDom.classList.toggle('focus');
  }
  
  getFocusedText() {
    return this.focusedDom.dataset.name;
  }

  changeBarText(target) {
    if(!this.focusedDom) return;
    const curFocusedText = this.getFocusedText();
    target.value = curFocusedText
  }

  resetFocusedDom() {
    this.focusedDom = null;
    this.curFocusedIdx = null;
  }
  
  clearAutoViewList() {
    this.autoViewItems = null;
    this.autocomItemslen = null;
  }
}