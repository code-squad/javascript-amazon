import { _$, _$c, __$ } from "/util.js";
import { DataFetch } from "/fetch.js";
import { fetchInfo, autoCompleteInfo } from "./config.js";

export function SearchAutoComplete(searchBar) {
  this.searchBar = searchBar;
  this.option = autoCompleteInfo.option;
  this.maxSuggestionLength = this.option.maxSuggestionLength || 9;
  this.fetchInfo = fetchInfo;
}

SearchAutoComplete.prototype = {
  getSuggestionList() {
    this.fetchMatchingWords().then(matchingWords =>
      this.makeSuggestionList(matchingWords)
    );
  },

  fetchMatchingWords() {
    const searchWord = this.searchBar.searchWord.toLowerCase();
    const matchingWords = new DataFetch(this.fetchInfo);

    return matchingWords
      .fetchData()
      .then(words =>
        words.searchData.filter(word => word.startsWith(searchWord))
      );
  },

  makeSuggestionList(matchingWords) {
    if (!matchingWords.length) return this.searchBar.hideAutoCompleteBox();
    const suggestions = matchingWords.slice(0, this.maxSuggestionLength);

    this.render(suggestions);
  },

  render(suggestions) {
    const FIRST_WORD_INDEX = 0;
    const searchWordLength = this.searchBar.searchWord.length;
    this.searchBar.showAutoCompleteBox();

    const suggestionList = suggestions.reduce((wordList, word) => {
      const matchingWord = word.slice(FIRST_WORD_INDEX, searchWordLength);
      const restWord = word.slice(searchWordLength);

      return (wordList += `<li><strong>${matchingWord}</strong>${restWord}</li>`);
    }, "");

    this.searchBar.autoCompleteBox.innerHTML = suggestionList;
  }
};
