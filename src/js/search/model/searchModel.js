class searchModel {
  constructor() {
    this.state = {
      recentSearches: [],
      autocomData: []
    }
  }

  setAutocomData(autocomData) {
    this.state.autocomData = autocomData
  }

  setRecentSearches(searchedWord) {
    this.state.recentSearches = [searchedWord, ...this.recentSearches];
  }

  getRecentSearches() {
    return this.state.recentSearches;
  }

  getAutocomData(inputLetters) {
    return this.autocomData.filter(word => word.includes(inputLetters));
  }

  // setState(newState) {
  //   this.state = {...this.state, ...newState}
  // }
}
