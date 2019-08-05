import * as ut from '../../../lib/myUtil/myUtil.js';
import { AUTOCOM_DATA_URL } from '../helper/config.js';
import { NOT_FOUND, UNEXPECTED_ERROR } from '../helper/message.js'


export default class ControlSearch {
  constructor({mainView, searchModel, searchIcon, DELAYED_TIME}) {
    this.mainView = mainView;
    this.searchModel = searchModel;
    this.timeoutID = null;
    this.searchIcon = searchIcon;
    this.showAutoView = ut.debounce(this.showAutoView.bind(this), DELAYED_TIME);
  }
 
  eventHandler() {
    const searchBar = this.mainView.getSearchBar();
    searchBar.addEventListener('focus', (e) => {
      this.showAutoView(e);
    });
    searchBar.addEventListener('blur', () => {
      this.autoViewViewer('all', 'hide');
    });
    searchBar.addEventListener('input', (e) => {
        this.showAutoView(e);
        this.focusAutoViewList(e);    
    });
    searchBar.addEventListener('keydown', (e) => {
      this.storeSearchedValues(e);
      this.focusAutoViewList(e);
    });
    this.searchIcon.addEventListener('click', (e) => {
      const inputVal = searchBar.value;
      this.storeSearchedValues({ key: type, value: inputVal});
      this.autoViewViewer('autocom', 'hide');
    })
  }

  // Recent Search / autocomplete - 화면에 출력
  showAutoView({ target: { value } }) {
    if(value) {
      this.autoViewViewer('recentSearch', 'hide');
      this.showAutocomplete(value);
    } else {
      this.autoViewViewer('autocom', 'hide');
      this.showRecentSearch();
    }
  }
  
  // autocomplete - 자동완성 화면에 출력
  async showAutocomplete(inputVal) {
    let matchedWords = [];
    matchedWords = await this.getMatchedWords(inputVal);
    if(!matchedWords) return;
    this.mainView.renderAutocomList(matchedWords, inputVal);
  }
    
    // model - search model과 의존(x)
    async getMatchedWords(inputVal) {
      const autocomUrl = AUTOCOM_DATA_URL+inputVal[0];
      const suggestions = await fetch(autocomUrl)
        .then( res => {
          const properResponse = res.status === 200 || res.status === 201;
          if(properResponse) return res.json();
          else return Promise.reject(res.status);
        })
        .then( json => json.body.suggestions)
        .catch( ({ name }) => {
          name === 'TypeError'
            ? console.log(`${name}: ${NOT_FOUND}`)
            : console.log(`${UNEXPECTED_ERROR}`);
        });
      if(!suggestions) return;
      return suggestions
        .map( ({ value }) => value )
        .filter( value => this.isMatched({ suggestion: value, input: inputVal }));
  }

  isMatched({ suggestion, input }) {
    return suggestion.includes(input);
  }
  
  // autocomplete - 자동완성 화면에서 제거
  removeAutocomList() {
    this.mainView.deleteAutocomList();
  }
  
  // recentSearch
  showRecentSearch() {
    const recentSearches = this.searchModel.getRecentSearches();
    this.mainView.renderRecentSearch(recentSearches);
  }

  // recent search / autocomplete - 검색바 아래 결과 리스트 방향키로 선택
  focusAutoViewList(e) {
    const { key, target } = e;
    if(key === 'ArrowUp' || key === 'ArrowDown') {
      // 방향키 (위, 아래)를 눌렀을 때 input bar안의 커서가
      // 왼쪽 오른쪾으로 움직이는 event bubbling을 제거하기 위해 preventDefault 사용.
      e.preventDefault();
      this.mainView.focusItem(key);
      this.mainView.changeBarText(target);
    }
  }

  // autocom / recentSearch
  autoViewViewer(viewType, action) {
    this.removeAutocomList();
    this.mainView.autoViewViewer(viewType, action);
  }
    
  //model - 검색한 결과 저장
  storeSearchedValues({ key, target: { value } }) {
    if(key === 'Enter' || key === 'click') {
      this.searchModel.setRecentSearches(value);
      this.autoViewViewer('all', 'hide');
    }
  }

  //model - 현재 입력한 결과를 저장
  storeCurrentInput({ value }) {
    this.searchModel.setCurInputVal(value);
  }
    
}