export default class searchModel {
  constructor(limitedNum) {
    this.curInputVal = null;
    this.recentSearches = [];
    this.autocomData = [
      'diplomatic',
      'opposition',
      'parameter',
      'understanding',
      'favorable',
      'beautiful',
      'multimedia',
      'publication',
      'timetable',
      'identity',
      'demonstrator',
      'manufacture',
      'minority',
      'constellation',
      'legislation',
      'community',
      'recovery',
      'astonishing',
      'miserable',
      'motorcycle',
    ];
    this.limitedNum = limitedNum
  }

  setCurInputVal(inputVal) {
    if(!inputVal) this.curInputVal = null;
    else this.curInputVal = inputVal;
  }

  getCurInputVal() {
    return this.curInputVal;
  }

  getMatchedWords() {
    return this.autocomData.filter(word => word.includes(this.curInputVal));
  }

  setRecentSearches(searchedVal) {
    this.recentSearches = [searchedVal, ...this.recentSearches];
    if(this.recentSearches.length > this.limitedNum) this.manageRecentSearches(this.limitedNum);
    console.log(this.recentSearches);
  }

  getRecentSearches() {
    return this.recentSearches;
  }

  manageRecentSearches() {
    this.recentSearches.length = this.limitedNum;
  }
}

//TODO: 1. input data 저장 (Search 한 것-enter, 돋보기 클릭)
//      2. recent search data 내보내기
//      3. recent search data 관리 (6개)