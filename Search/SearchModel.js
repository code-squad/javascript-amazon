class SearchModel {
  constructor({ fetchURL }) {
    this.historyQueue = [];
    this.fetchURL = fetchURL;
  }

  async getData(input) {
    try {
      const response = await fetch(this.fetchURL + input);
      const fetchedData = await response.json(); 
      if(fetchedData.statusCode === 404) throw Error('입력한 값에 맞는 데이터가 없습니다.'); 
      return fetchedData; // 있을때
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
