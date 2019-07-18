class SearchModel {

  
  async find(input){
    const dataURL = `https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/amazon_autocomplete?query=${input}`
    const response = await fetch(dataURL);
    const fetchedData = await response.json();
    console.log("model이 아마존서버에서 받아온데이터",fetchedData);
    return fetchedData;
  }
}

export default SearchModel;