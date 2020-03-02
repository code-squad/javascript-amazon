import { _$, _$c, __$ } from '/util.js';

export function SearchAutoCompleteView() {
    this.suggestionsBox = _$('.search__autoComplete');
}

SearchAutoCompleteView.prototype = {
    render(terms, length) {
        this.showSuggestions();

        this.suggestionsBox.innerHTML = terms.reduce((termList, term) => {
            const start = term.slice(0, length)
            const end = term.slice(length)
            return termList += `<li><strong>${start}</strong>${end}</li>`
        }, '')
    },

    hideSuggestions() {
        const backGround = _$('.bg');

        __$(this.suggestionsBox).hide();
        __$(backGround).hide();
    },

    showSuggestions() {
        const backGround = _$('.bg');

        __$(this.suggestionsBox).show();
        __$(backGround).show();
    },

    showSelected(selectedTerm) {
        this.hideSelected();
        _$c(selectedTerm).add('selected');

    },

    hideSelected() {
        const selected = _$('.selected');
        if (selected) _$c(selected).remove('selected');
    },

    SelecteSearchTerm(searchBox, selectedTerm) {
        searchBox.value = selectedTerm.textContent;
        this.hideSuggestions();
    }

}