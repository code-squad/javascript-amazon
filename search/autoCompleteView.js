import { _$ } from '/util.js';

export function SearchAutoCompleteView() {
    this.resultArea = _$('.search__result');
}
SearchAutoCompleteView.prototype = {
    render(words) {
        this.resultArea.style.display = 'block';
        this.resultArea.innerHTML = words.reduce((wordList, word) => {
            return wordList += `<li>${word}</li>`
        }, '')
    },

    onDisplayNone() {
        this.resultArea.style.display = 'none';
    },
}