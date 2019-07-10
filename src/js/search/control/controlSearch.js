export default class ControlSearch {
  constructor({searchBarView, searchModel, autocompleteView}) {
    this.searchBarView = searchBarView;
    this.searchModel = searchModel;
    this.autocompleteView = autocompleteView;
    // this.getAutocomVal = this.getAutocomVal.bind(this);
    // this.showAutocomList = this.showAutocomList.bind(this);
  }

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
    const autocomVal = this.searchModel.getIncludedWords();
    return autocomVal;
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