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
<<<<<<< HEAD

  // setState(newState) {
  //   this.state = {...this.state, ...newState}
  // }
}
=======
}
>>>>>>> Add a function to focus list of auto view in recent search
