class SearchModel {
  constructor({ fetchURL }) {
    this.historyQueue = [];
    this.fetchURL = fetchURL;
  }

  async find(input) {
    try {
      const response = await fetch(this.fetchURL + input);
      const fetchedData = await response.json();
      if(fetchedData.statusCode === 404) throw new Error('404에러:  데이터가 없습니다'); //데이터가 없을때 예외처리
      return fetchedData;
    } catch(error) {
      console.warn(error);
      return;
    }
  }

  save(value) {
    this.historyQueue = this.historyQueue.concat(value);
  }
}

export default SearchModel;
