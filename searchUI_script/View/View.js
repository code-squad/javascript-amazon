export default class View {
  constructor() {
    this.autocompleteUl = document.querySelector('.autocomplete-ul');
    this.autocomplete = document.querySelector('.search-autocomplete');
    this.showSuggestion = '';
  }

  isSuggestion(suggestionsArr) {
    this.showSuggestion = '';
    const noSuggestion = 0;
    if (suggestionsArr.length === noSuggestion) {
      this.removeSuggestion()
    } else {
      this.renderSuggestion(suggestionsArr)
    }
  }

  removeSuggestion() {
    this.autocomplete.classList.remove('search-autocomplete-show');
  }

  renderSuggestion(suggestionsArr) {
    suggestionsArr.forEach(suggestion => {
      this.showSuggestion += `
      <li class = "suggestion"> 
        ${suggestion}
      </li>`
    });
    this.autocompleteUl.innerHTML = this.showSuggestion;
    this.autocomplete.classList.add('search-autocomplete-show');
  }
}