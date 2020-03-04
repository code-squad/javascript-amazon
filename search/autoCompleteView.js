import { _$, _$c, __$ } from '/util.js';

export function SearchAutoCompleteView({ suggestionBox, darkBackground, selectedTerm, inputFocus }) {
    this.suggestionBox = _$(suggestionBox);
    this.darkBackground = _$(darkBackground);
    this.selectedTermClassName = selectedTerm;
    this.inputFocusClassName = inputFocus;
}

SearchAutoCompleteView.prototype = {
    render(suggestions, searchTermLength) {
        const FIRST_TERM_INDEX = 0;
        this.showSuggestionBox();

        const suggestionList = suggestions.reduce((termList, term) => {
            const matchingTerm = term.slice(FIRST_TERM_INDEX, searchTermLength);
            const restTerm = term.slice(searchTermLength);

            return termList +=
                `<li><strong>${matchingTerm}</strong>${restTerm}</li>`
        }, '')

        this.suggestionBox.innerHTML = suggestionList;
    },

    hideSuggestionBox() {
        if (this.darkBackground) __$(this.darkBackground).hide();
        __$(this.suggestionBox).hide();
    },

    showSuggestionBox() {
        if (this.darkBackground) __$(this.darkBackground).show();
        __$(this.suggestionBox).show();
    },

    paintSelectedTerm(selectedTerm) {
        this.removeSelectedTerm();
        _$c(selectedTerm).add(this.selectedTermClassName);
    },

    removeSelectedTerm() {
        const selectedTerm = _$('.' + this.selectedTermClassName);

        if (selectedTerm)
            _$c(selectedTerm).remove(this.selectedTermClassName);
    },

    selecteSearchTerm(searchInput, selectedTerm) {
        searchInput.value = selectedTerm.textContent;
        this.hideSuggestionBox();
    },

    focusInputBorder(searchField) {
        _$c(searchField).add(this.inputFocusClassName)
    },

    blurInputBorder(searchField) {
        _$c(searchField).remove(this.inputFocusClassName);
        this.hideSuggestionBox();
    }
}
