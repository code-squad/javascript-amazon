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

  manageRecentSearches() {
    this.recentSearches.length = this.limitedNum;
  }
}