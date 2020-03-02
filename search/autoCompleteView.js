import { _$, _$c } from '/util.js';

export function SearchAutoCompleteView() {
    this.resultArea = _$('.search__result');
}
SearchAutoCompleteView.prototype = {
    render(words) {
        _$c(this.resultArea).add('on');

        this.resultArea.innerHTML = words.reduce((wordList, word) => {
            return wordList += `<li>${word}</li>`
        }, '')
    },

    onDisplayNone() {
        return _$c(this.resultArea).remove('on');
    },

    showSelected(selectedWord) {
        this.hideSelected();
        _$c(selectedWord).add('selected');
    },

    hideSelected() {
        const selected = _$('.selected');
        if (selected) _$c(selected).remove('selected');
    }
}