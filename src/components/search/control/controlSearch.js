import config from '../helper/config.js';

export default class ControlSearch {
  constructor({mainView, searchModel, searchIcon, delayedTime, autocompleteData}) {
    this.mainView = mainView;
    this.searchModel = searchModel;
    this.timeoutID = null;
    this.searchIcon = searchIcon;
    this.delayedTime = delayedTime;
    this.autocomData = autocompleteData;
  }
 
  eventHandler() {
    const searchBar = this.mainView.getSearchBar();
    searchBar.addEventListener('focus', ({target}) => {
      this.showAutoView(target);
    });
    searchBar.addEventListener('blur', () => {
      this.autoViewViewer('all', 'hide');
    });
    searchBar.addEventListener('input', (e) => {
      this.showAutoView(e.target);
      this.focusAutoViewList(e);
    });
    searchBar.addEventListener('keydown', (e) => {
      this.storeSearchedValues(e.key, e.target.value);
      this.focusAutoViewList(e);
    });
    this.searchIcon.addEventListener('click', (e) => {
      const inputVal = searchBar.value;
      this.storeSearchedValues(e.type, inputVal);
      this.autoViewViewer('autocom', 'hide');
    })
  }

  // Recent Search / autocomplete - 화면에 출력
  showAutoView({value}) {
    if(value) {
      this.autoViewViewer('recentSearch', 'hide');
      this.showAutocomplete(value);
    } else {
      this.autoViewViewer('autocom', 'hide');
      this.showRecentSearch();
    }
  }
  
  // autocomplete - 자동완성 화면에 출력
  showAutocomplete(inputVal) {
    const matchedWords = this.getMatchedWords(inputVal);
    if(matchedWords.length){
      this.timeoutID = setTimeout(()=>{
        this.mainView.renderAutocomList(matchedWords, inputVal);
      }, this.delayedTime);
    }
  }
  
  // model - search model과 의존(x)
  getMatchedWords(inputVal) {
    return this.autocomData.filter(word => word.includes(inputVal));
  }
  
  // autocomplete - 자동완성 화면에서 제거
  removeAutocomList() {
    clearTimeout(this.timeoutID);
    this.mainView.deleteAutocomList();
  }
  
  // recentSearch
  showRecentSearch() {
    const recentSearches = this.searchModel.getRecentSearches();
    this.mainView.renderRecentSearch(recentSearches);
  }

  // recent search / autocomplete - 검색바 아래 결과 리스트 방향키로 선택
  focusAutoViewList(e) {
    if(e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      // 방향키 (위, 아래)를 눌렀을 때 input bar안의 커서가
      // 왼쪽 오른쪾으로 움직이는 event bubbling을 제거하기 위해 preventDefault 사용.
      e.preventDefault();
      this.mainView.focusItem(e.key);
      this.mainView.changeBarText(e.target);
    }
  }

  // autocom / recentSearch
  autoViewViewer(viewType, action) {
    if(this.timeoutID) this.removeAutocomList();
    this.mainView.autoViewViewer(viewType, action);
  }
    
  //model - 검색한 결과 저장
  storeSearchedValues(key, value) {
    if(key === 'Enter' || key === 'click') {
      this.searchModel.setRecentSearches(value);
      this.autoViewViewer('all', 'hide');
    }
  }

  //model - 현재 입력한 결과를 저장
  storeCurrentInput({value}) {
    this.searchModel.setCurInputVal(value);
  }
    
}