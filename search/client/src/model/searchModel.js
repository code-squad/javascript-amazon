function SearchModel() {
  this.matchingItem = [];
  this.LOCALHOST_URL = "http://127.0.0.1:4000";
}

SearchModel.prototype = {
  constructor: SearchModel,
  async fetchData(inputValue){
    const response = await fetch(this.LOCALHOST_URL);
    const matchingData = await response.json();
    await sleep(300);
    this.matchArray(matchingData, inputValue);
  },

  matchArray(matchingData, inputValue) {
    this.matchingItem = [];
    matchingData.searchData.forEach((matchingWord) => {
      if(matchingWord.indexOf(inputValue)=== 0) {
        this.matchingItem.push(matchingWord);
      }    
    })
  },
}