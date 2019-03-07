export default class Model {
  constructor() {
  }

  fetchData(responseUrl) {
    const fetchVal = fetch(responseUrl)
      .then(res => res.json())
      .then(data => {
        return this.suggestionArr = data.suggestions.map(suggestion => {
          return suggestion.value;
        });
      })
    return fetchVal;
  }


}