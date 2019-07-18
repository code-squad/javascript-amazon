export default class ControlSearch {
  constructor({mainView, searchModel}) {
    this.mainView = mainView;
    this.searchModel = searchModel;
    this.timeoutID = null;
    // this.autocompleteView = autocompleteView;
    // this.recentSearchView = recentSearchView;
    // this.viewRecentSearch = this.viewRecentSearch.bind(this);
    // this.hideSearchHelpList = this.hideSearchHelpList.bind(this);
  }
  eventHandler() {
    const searchBar = this.mainView.getSearchBar();
    searchBar.addEventListener('focus', ({target}) => {
      //최근검색과 자동완성 공통으로 쓰이는 메소드
      this.showAutocomplete(target);
      this.showRecentSearch(target);
      
    });
    searchBar.addEventListener('blur', e => {
      //최근검색과 자동완성 공통으로 쓰이는 메소드
      this.autoViewViewer('all', 'hide');
    });
    searchBar.addEventListener('input', ({target}) => {
      this.storeCurrentInput(target);
      this.showAutocomplete(target);
      this.showRecentSearch(target);
      // this.autocompleteHandler(e);
      // const isInputting = this.searchBarView.isInputting();
      // if(isInputting) this.showRecentSearch(e);
    });
    searchBar.addEventListener('keydown', e => {
      // this.selectAutocomList(e);
      this.storeSearchedValues(e);
    });
  }
    
  showAutocomplete({value}) {
    if(this.timeoutID) this.removeAutocomList();
    if(!value) {
      this.autoViewViewer('autocom', 'hide');
      return;
    }
    const matchedWords = this.searchModel.getMatchedWords();
    if(matchedWords.length){
      this.timeoutID = setTimeout(()=>{
        this.mainView.renderAutocomList(matchedWords, value);
      }, 300)
    }
  }
      
  removeAutocomList() {
    clearTimeout(this.timeoutID);
    this.mainView.deleteAutocomList();
  }
          
  // selectAutocomList(e) {
  //   if(e.keyCode === 38 || e.keyCode === 40) {
  //     // 방향키 (위, 아래)를 눌렀을 때 input bar안의 커서가
  //     // 왼쪽 오른쪾으로 움직이는 event bubbling을 제거하기 위해 preventDefault 사용.
  //     e.preventDefault();
  //     this.autocompleteView.focusItem(e);
  //   }
  // }

  // autocom / recentSearch
  autoViewViewer(viewType, action) {
    this.mainView.autoViewViewer(viewType, action);
  }
    
  //model - 검색한 결과 저장
  storeSearchedValues(e) {
    if(e.keyCode === 13) {
      this.searchModel.setRecentSearches(e.target.value, this.limitedNum); 
    }
  }

  //model - 현재 입력한 결과를 저장
  storeCurrentInput({value}) {
    // const currentVal = this.searchBarView.getInputVal(value);
    this.searchModel.setCurInputVal(value);
  }
    
    // recentSearch
  showRecentSearch({value}) {
    if(value) {
      this.autoViewViewer('recentSearch', 'hide');
      return;
    }
    const recentSearches = this.searchModel.getRecentSearches();
    this.mainView.viewRecentSearch(recentSearches);
  }


  // hideSearchHelpList() {
  //   this.recentSearchView.removeSearchHelpList();
  // }
}