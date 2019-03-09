export default class View {
  constructor() {
    this.autocompleteUl = document.querySelector('.autocomplete-ul');
    this.autocomplete = document.querySelector('.search-autocomplete');
    this.showSuggestion = '';
  }

  isSuggestionVal(suggestionValArr) {
    this.showSuggestion = '';
    const noSuggestion = 0;
    if (suggestionValArr.length === noSuggestion) {
      this.removeSuggestion()
    } else {
      this.renderSuggestion(suggestionValArr);
    }
  }

  removeSuggestion() {
    this.autocomplete.classList.remove('search-autocomplete-show');
  }

  renderSuggestion(suggestionArr) {
    suggestionArr.forEach(suggestion => {
      let splitKeyword = suggestion.value.split(' ');
      let joinKeyword = splitKeyword.join('+');
      this.showSuggestion += `
      <li class = "suggestion">
        <a class = "suggestionLink" href = "https://www.amazon.com/s?k=${joinKeyword}&prefix=?&ref=${suggestion.refTag}">  
         ${suggestion.value}
        </a>
      </li>`
    });

    this.autocompleteUl.innerHTML = this.showSuggestion;
    this.autocomplete.classList.add('search-autocomplete-show');
  }
}