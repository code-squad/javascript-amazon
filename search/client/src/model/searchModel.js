function SearchModel({LOCALHOST_URL}) {
  this.matchingItem = [];
  this.LOCALHOST_URL = LOCALHOST_URL;
}

SearchModel.prototype = {
  constructor: SearchModel,
  async fetchData(inputValue){
    const response = await fetch(this.LOCALHOST_URL);
    const matchingData = await response.json();
    await sleep(100);
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