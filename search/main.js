import { SearchBar } from "./searchBar.js";
import { SearchAutoComplete } from "./autoComplete.js";

export function initSearch() {
  const searchBar = createSearchBar();
  const autoComplete = createAutoComplete(searchBar);

  searchBar.onSearchBarEvent(autoComplete.getSuggestionList.bind(autoComplete));
}

function createSearchBar() {
  const searchBarInfo = {
    searchField: "#search",
    searchInput: "#search__input",
    option: {
      darkBackground: ".bg",
      inputFocus: "active",
      delayTime: 300,
      autoCompleteBox: ".search__autoComplete",
      selectedWord: "selected"
    }
  };

  return new SearchBar(searchBarInfo);
}

function createAutoComplete(searchBar) {
  const autoCompleteInfo = {
    option: {
      maxSuggestionLength: 9
    }
  };
  return new SearchAutoComplete({ searchBar, autoCompleteInfo });
}
