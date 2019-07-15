export default class ControlSearch {
  constructor({searchBarView, searchModel, autocompleteView}, numOfList) {
    this.searchBarView = searchBarView;
    this.searchModel = searchModel;
    this.autocompleteView = autocompleteView;
    this.numOfList = numOfList;
    this.autocomHandler = this.autocomHandler.bind(this);
    this.selectAutocomList = this.selectAutocomList.bind(this);
    // this.getAutocomVal = this.getAutocomVal.bind(this);
    // this.showAutocomList = this.showAutocomList.bind(this);
  }
  /*
    TODO: 1. Refactoring하기. - 
          2. 최근 검색 List 구현하기.
          3. 자동완성 data JSON으로 만들어서 Model에 전달.
          4. li에 'tabindex="1"' 속성 사용 / nextsibling
          5. input 클릭 => focus
  */
  eventHandler() {
    const searchBar = this.searchBarView.getSearchBarDom();
    searchBar.addEventListener('input', this.autocomHandler);
    searchBar.addEventListener('keydown', this.selectAutocomList)
  }

  autocomHandler(e) {
    if(!e.srcElement.value) {
        this.removeAutocomList();
      return;
    }
    this.storeCurrentInput(e);
    const autocomValues = this.getAutocomVal();
    this.showAutocomList(autocomValues, e.srcElement.value);
  }

  storeCurrentInput(e) {
    const currentVal = this.searchBarView.getInputVal(e);
    this.searchModel.setCurInputVal(currentVal);
  }

  getAutocomVal() {
    return this.searchModel.getMatchedWords();
  }

  showAutocomList(values, inputVal) {
    this.removeAutocomList();
    // this.numOflist option으로 받도록 설정 (리스트 갯수 설정)
    if(values.length) this.autocompleteView.attachAutocomList(values, inputVal, this.numOfList);
  }
  
  removeAutocomList() {
    setTimeout( () => {
      this.autocompleteView.dettachAutocomList();
    },300)
  }

  selectAutocomList(e) {
    if(e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
      this.autocompleteView.focusItem(e);
    }
  }
  
  // selectAutocomList(e) {
    
  //   if(e.keyCode === 38 || e.keyCode === 40) {
  //     e.preventDefault();
  //   }
  // }
}