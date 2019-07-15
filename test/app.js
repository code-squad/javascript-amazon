import Controller from "./controller.js";
import SearchView from "./searchView.js";
import AutoCompleteView from "./autoCompleteView.js";
import RecentSearchView from "./recentSearchView.js";

const searchView = new SearchView([".search-form", ".find-btn"]);
const autoCompleteView = new AutoCompleteView(".modal-autocomplete");
const recentSearchView = new RecentSearchView(".modal-recent");

const controller = new Controller({
  searchView,
  autoCompleteView,
  recentSearchView
});

window.addEventListener("DOMContentLoaded", () => {
  controller.getData("./data.json");
});
