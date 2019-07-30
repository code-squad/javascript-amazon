import SearchView from "./SearchView.js";

export default class Autocomplete {
  constructor({ autocompleteElement, categories, options }) {
    const searchView = new SearchView({ categories, options });

    autocompleteElement.innerHTML = searchView.getTemplate();
    searchView.attachEvent();
  }
}
