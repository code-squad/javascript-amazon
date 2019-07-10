export default class ControlSearch {
  constructor({searchBarView, searchModel}) {
    this.searchBarView = searchBarView;
    this.searchModel = searchModel;
  }

  storeCurrentInput() {
    const searchBar = this.searchBarView.getSearchBarDom();
    searchBar.addEventListener('input', (e) => {
      console.log(this.searchBarView.getInputVal)
      const currentVal = this.searchBarView.getInputVal(e);
      this.searchModel.setCurInputVal(currentVal);
    });
  }
}