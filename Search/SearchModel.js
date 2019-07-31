class SearchModel {
  constructor({ fetchURL }) {
    this.historyQueue = [];
    this.fetchURL = fetchURL;
  }

  async getData(input) {
    try {
      const response = await fetch(this.fetchURL + input);
      const fetchedData = await response.json(); 
      if(fetchedData.statusCode === 404) return; // 데이터가 없을때
      return fetchedData; // 있을때
    } catch(error) {
      console.warn(error); //알수없는 에러 
      return; 
    }
  }

  save(value) {
    this.historyQueue = this.historyQueue.concat(value);
  }
}

export default SearchModel;
