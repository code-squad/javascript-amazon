import { _$, _$c } from '/util.js';

export function SearchAutoCompleteView() {
    this.resultArea = _$('.search__autoComplete');
}
SearchAutoCompleteView.prototype = {
    render(terms, length) {
        _$c(this.resultArea).add('on');

        this.resultArea.innerHTML = terms.reduce((termList, term) => {
            const start = term.slice(0, length)
            const end = term.slice(length)
            return termList += `<li><strong>${start}</strong>${end}</li>`
        }, '')
    },

    onDisplayNone() {
        return _$c(this.resultArea).remove('on');
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
        this.onDisplayNone();
    },

}