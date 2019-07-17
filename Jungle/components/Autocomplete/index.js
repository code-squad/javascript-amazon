import AutocompleteView from "./AutocompleteView.js";

export default class Autocomplete {
  constructor({ autocompleteElement, categories, options }) {
    new AutocompleteView({ autocompleteElement, categories, options });
  }
}
