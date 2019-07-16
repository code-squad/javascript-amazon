import AutocompleteView from "./AutocompleteView.js";

export default class Autocomplete {
  constructor({ autocompleteElement, categories, options }) {
    //TODO: 전달받은 autocomplete element를 AutocompleteView에 주입하여 생성
    new AutocompleteView({ autocompleteElement, categories, options });
  }
}
