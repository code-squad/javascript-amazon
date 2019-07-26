class SearchModel {
  constructor() {
    this.historyQueue = [];
  }

  async find(input) {
    const dataURL = `https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/amazon_autocomplete?query=${input}`;
    const response = await fetch(dataURL);
    const fetchedData = await response.json();
    if(fetchedData.statusCode === 404) return; //데이터가 없을때 예외처리
    return fetchedData;
  }

  save(value) {
    this.historyQueue = this.historyQueue.concat(value);
  }
}

export default SearchModel;
