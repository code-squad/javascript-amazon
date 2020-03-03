import { _$, _$c, __$ } from '/util.js';

export function SearchAutoCompleteView({ suggestionBox, dargBackground, selectedTerm }) {
    this.suggestionBox = _$(suggestionBox);
    this.dargBackground = _$(dargBackground);
    this.selectedTermClassName = selectedTerm;
}

SearchAutoCompleteView.prototype = {
    render(terms, searchTermLength) {
        const FIRST_TERM_INDEX = 0;
        this.showSuggestions();

        const resultList = terms.reduce((termList, term) => {
            const matchingTerm = term.slice(FIRST_TERM_INDEX, searchTermLength);
            const restTerm = term.slice(searchTermLength);

            return termList +=
                `<li><strong>${matchingTerm}</strong>${restTerm}</li>`
        }, '')

        this.suggestionBox.innerHTML = resultList;
    },

    hideSuggestions() {
        if (this.dargBackground) __$(this.dargBackground).hide();
        __$(this.suggestionBox).hide();
    },

    showSuggestions() {
        if (this.dargBackground) __$(this.dargBackground).show();
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

    selecteSearchTerm(searchBar, selectedTerm) {
        searchBar.value = selectedTerm.textContent;
        this.hideSuggestions();
    }
}
