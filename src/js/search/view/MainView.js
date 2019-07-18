import template from './template/Template.js';
import ut from '../../myUtil/myUtil.js'

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
    this.delayedTime = 300;
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
    const className = 'search__auto-view';
    const autoViewContainer = template.createAutoViewContainer(className);
    ut.appendElLastly(this.inputBox, autoViewContainer);
    this.autoViewContainer = ut.qrSelectorByClass(className, this.input)
  }
  
  viewRecentSearch(recentSearches) {
    const isRecentSearch = this.recentSearchView.recentSearchChecker();
    if(recentSearches.length && !isRecentSearch) {
      this.recentSearchView.render(recentSearches);
      this.recentSearchView.showAutoView();
      return;
    }
    if(isRecentSearch) {
      this.recentSearchView.showAutoView();
    }
  }

  autoViewViewer(viewType, action){
    if(viewType === 'recentSearch') {
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

  renderAutocomList(matchedWords, value) {
    this.autocompleteView.renderAutocomplete(matchedWords, value, this.delayedTime)
    this.autoViewItems = this.autocompleteView.getAutocomList();
  }

  deleteAutocomList() {
    // this.resetFocusDom();
    // this.clearAutocomList();
    // clearTimeout(this.timeoutID);
    this.autoViewViewer('autocom', 'hide');
    this.autocompleteView.deleteRenderedList();
  }
  
  focusItem({keyCode}) {
    if (!this.autoViewItems) return;
    this.numOfAutoView = this.autoViewItems.length;
    if(this.focusedDom === null) {
      this.firstFocus(keyCode);
    } else {
      this.moveFocus(keyCode);
    }
  }
  
  firstFocus(keyCode) {
    const firstItemIdx = 0,
    lastItemIdx = this.numOfAutoView - 1;
    if(keyCode === 40) {
      this.focusedDom = this.autoViewItems[firstItemIdx];
      this.curFocusedIdx = firstItemIdx;
    } else {
      this.focusedDom = this.autoViewItems[lastItemIdx];
      this.curFocusedIdx = lastItemIdx;
    }
    this.focusToggle(this.focusedDom);
  }
  
  moveFocus(keyCode) {
    this.focusToggle(this.focusedDom);
    let nextItemIdx;
    keyCode === 40 ? nextItemIdx = this.curFocusedIdx + 1 : nextItemIdx = this.curFocusedIdx - 1;
    if(nextItemIdx < 0 || nextItemIdx >= this.numOfAutoView) {
      this.resetFocusDom();
      return;
    }
    this.focusedDom = this.autoViewItems[nextItemIdx];
    this.curFocusedIdx = nextItemIdx;
    this.focusToggle(this.focusedDom);
  }
  
  focusToggle(targetElem) {
    if(!this.focusedDom) return;
    targetElem.classList.toggle('focus');
  }
  
  getFocusedText() {
    return this.focusedDom.dataset.name;
  }

  changeBarText({target}) {
    if(!this.focusedDom) return;
    const curFocusedText = this.getFocusedText();
    target.value = curFocusedText
  }

  setAutoViewItems(autoViewContainer) {
    this.autoViewItems = autoViewContainer.children;
  }

  resetFocusDom() {
    this.focusedDom = null;
    this.curFocusedIdx = null;
  }
  
  clearAutocomList() {
    this.autoViewItems = null;
    this.autocomItemslen = null;
  }
  
}