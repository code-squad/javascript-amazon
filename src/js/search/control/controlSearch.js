export default class ControlSearch {
  constructor({searchBarView, searchModel, autocompleteView}) {
    this.searchBarView = searchBarView;
    this.searchModel = searchModel;
    this.autocompleteView = autocompleteView;
    // this.getAutocomVal = this.getAutocomVal.bind(this);
    // this.showAutocomList = this.showAutocomList.bind(this);
  }
  /*
    TODO: 1. Refactoring하기.
          2. 최근 검색 List 구현하기.
          3. 자동완성 data JSON으로 만들어서 Model에 전달.
  */
  eventHandler() {
    const searchBar = this.searchBarView.getSearchBarDom();
    searchBar.addEventListener('input', (e) => {
      if(!e.srcElement.value) {
        this.removeAutocomList();
        return;
      }
      this.storeCurrentInput(e);
      const autocomValues = this.getAutocomVal();
      this.showAutocomList(autocomValues);
    });

  }

  storeCurrentInput(e) {
    const currentVal = this.searchBarView.getInputVal(e);
    this.searchModel.setCurInputVal(currentVal);
  }

  getAutocomVal() {
    return this.searchModel.getIncludedWords();
  }

  showAutocomList(values) {
    this.removeAutocomList();
    this.autocompleteView.attachContainer();
    this.autocompleteView.attachAutocomList(values);
  }
  
  removeAutocomList() {
    this.autocompleteView.dettachAutocomList();
  }
}