// import ut from '../myUtil/myUtil'
// import template from './template/Template';

export default class SearchBarView {
  constructor(searchBar) {
    this.searchBar = searchBar;
    this.inputChecker = false;
  }

  getInputVal(value) {
    !value ? this.inputChecker = false : true;
    return value;
  }

  isInputting() {
    return this.inputChecker;
  }

  getNdSearchBar() {
    return this.searchBar;
  }
}