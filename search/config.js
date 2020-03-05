export const fetchInfo = {
  dataUrl: "http://127.0.0.1:8080/search/",
  localStorageKey: "searchData",
  requestOption: {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  }
};

export const autoCompleteInfo = {
  option: {
    maxSuggestionLength: 9
  }
};

export const searchBarInfo = {
  option: {
    darkBackground: ".bg",
    inputFocus: "active",
    delayTime: 300,
    autoCompleteBox: ".search__autoComplete",
    selectedWord: "selected"
  },
  searchField: "#search",
  searchInput: "#search__input"
};
