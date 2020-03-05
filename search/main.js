import { SearchBar } from "./searchBar.js";
import { SearchAutoComplete } from "./autoComplete.js";

export function initSearch() {
  const searchBar = new SearchBar();
  const autoComplete = new SearchAutoComplete(searchBar);
  searchBar.onSearchBarEvent(autoComplete.getSuggestionList.bind(autoComplete));
}

initSearch();
