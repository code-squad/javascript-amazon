import { _$, _$c, __$ } from '/util.js';

export function SearchAutoCompleteView() {
    this.suggestionBox = _$('.search__autoComplete');
}

SearchAutoCompleteView.prototype = {
    render(terms, searchTermLength) {
        this.showSuggestions();

        const resultList = terms.reduce((termList, term) => {
            const matchingTerm = term.slice(0, searchTermLength);
            const restTerm = term.slice(searchTermLength);

            return termList +=
                `<li><strong>${matchingTerm}</strong>${restTerm}</li>`
        }, '')

        this.suggestionBox.innerHTML = resultList;
    },

    hideSuggestions() {
        const backGround = _$('.bg');

        __$(this.suggestionBox).hide();
        __$(backGround).hide();
    },

    showSuggestions() {
        const backGround = _$('.bg');

        __$(this.suggestionBox).show();
        __$(backGround).show();
    },

    paintSelectedTerm(selectedTerm) {
        this.removeSelectedTerm();
        _$c(selectedTerm).add('selected');

    },

    removeSelectedTerm() {
        const selectedTerm = _$('.selected');
        if (selectedTerm) _$c(selectedTerm).remove('selected');
    },

    selecteSearchTerm(searchBar, selectedTerm) {
        searchBar.value = selectedTerm.textContent;
        this.hideSuggestions();
    }
}
