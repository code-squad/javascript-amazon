import { _$, _$e, _$c, __$ } from '/util.js';
// import { searchFetchOption } from '/config.js';

export function SearchController({ model, inputView, autoCompleteView, controllerOption }) {
    this.model = model;
    // this.inputVeiw = inputView;
    this.autoCompleteView = autoCompleteView;
    // this.option = controllerConfig;
    this.keyDownCount = 0;
}

SearchController.prototype = {

    onAutoCompleteEvent() {
        const searchInput = _$('#search__input');
        const searchField = _$('.search__container');

        __$(searchInput).on('click', () => _$c(searchField).add('active'));
        __$(searchInput).on('blur', () => _$c(searchField).remove('active'));
        __$(searchInput).on('input', () => _$e.debounce(300, this, this.getSearchWords));

        __$(searchField).on('keydown', (e) => {
            const a = e.currentTarget.childNodes[3].childNodes
            const aLength = e.currentTarget.childNodes[3].childNodes.length
            if (e.keyCode === 40) {
                this.keyDownCount++;
                if (!a[this.keyDownCount - 1] || aLength < this.keyDownCount) {
                    this.autoCompleteView.hideSelected();
                    return this.keyDownCount = 0;
                }
                this.autoCompleteView.showSelected(a[this.keyDownCount - 1]);
            } else if (e.keyCode === 38) {
                this.keyDownCount--;
                if (!a[this.keyDownCount - 1]) {
                    this.autoCompleteView.hideSelected();
                    return this.keyDownCount = aLength + 1;
                }
                this.autoCompleteView.showSelected(a[this.keyDownCount - 1]);
            }
        });
    },

    getSearchWords() {
        const searchInput = _$('#search__input');
        const searchWord = searchInput.value;
        this.keyDownCount = 0;

        if (!searchWord) return this.autoCompleteView.onDisplayNone();

        const words = this.model.findMatchingWords(searchWord);
        words.then(words => {
            if (words.length === 0) return this.autoCompleteView.onDisplayNone();
            const slicedWords = words.slice(0, 9);
            this.autoCompleteView.render(slicedWords);
        })
    }
}

