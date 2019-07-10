// import ut from '../myUtil/myUtil'
// import template from './template/Template';

export default class SearchBarView {
  constructor() {
    this.searchBar = document.querySelector('.input__box--search-bar');
  }

  getSearchBarDom() {
    return this.searchBar;
  }

  getInputVal({srcElement}) {
    return srcElement.value;
  }
}