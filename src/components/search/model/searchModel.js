export default class searchModel {
  constructor(limitedNum) {
    this.recentSearches = [];
    this.limitedNum = limitedNum;
  }

  setRecentSearches(searchedVal) {
    // TODO: 로직 함수 구현
    this.recentSearches = [...new Set([searchedVal, ...this.recentSearches])];
    if(this.recentSearches.length > this.limitedNum) this.manageRecentSearches();
  }

  getRecentSearches() {
    return this.recentSearches;
  }

  // 값을 리턴하고 배열을 변경해주는 걸로 (순수함수)
  manageRecentSearches() {
    this.recentSearches.length = this.limitedNum;
  }
}