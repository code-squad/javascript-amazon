class SearchModel {
  constructor() {
    this.historyQueue = [];
  }

  async find(input) {
    const dataURL = `https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/amazon_autocomplete?query=${input}`;

    if (input === "") return; // input이 없을때 response안타고 빠르게 리턴했는데 이게 최선인지; response와 fetchedData의 리턴타입을 한번 파봐야할듯
    const response = await fetch(dataURL);
    const fetchedData = await response.json();
    // console.log("model이 아마존서버에서 받아온데이터",fetchedData);
    return fetchedData;
  }

  save(value) {
    this.historyQueue = this.historyQueue.concat(value);
    console.log('historyQueue',this.historyQueue);
  }
}

export default SearchModel;
