export default class Model {
  constructor() {
  }

  fetchData(responseUrl) {
    const fetchVal = fetch(responseUrl)
      .then(res => res.json())
      .then(data => {
        return data.suggestions
      })
    return fetchVal;
  }

  getSuggestionVal(suggestionArr) {
    const suggestionValArr = suggestionArr.map(suggestion => {
      return suggestion.value;
    });
    return suggestionValArr;
  }
}