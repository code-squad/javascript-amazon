import { _$, _$e, _$c } from '/util.js';
// import { searchFetchOption } from '/config.js';

export function SearchController({ model, inputView, autoCompleteView, controllerOption }) {
    this.model = model;
    // this.inputVeiw = inputView;
    this.autoCompleteView = autoCompleteView;
    // this.option = controllerOption;
}

SearchController.prototype = {

    onAutoCompleteEvent() {
        const searchInput = _$('#search__input');
        const searchField = _$('.search__container')
        _$e.on(searchInput, 'click', () => _$c.add(searchField, 'active'));
        _$e.on(searchInput, 'blur', () => _$c.remove(searchField, 'active'));
        _$e.on(searchInput, 'input', () => _$e.debounce(300, this, this.getSearchWords));
    },

    getSearchWords() {
        const searchInput = _$('#search__input');
        const searchWord = searchInput.value;

        if (!searchWord) return this.autoCompleteView.onDisplayNone();

        const words = this.model.findMatchingWords(searchWord);
        words.then(words => {
            if (words.length === 0) return this.autoCompleteView.onDisplayNone();
            this.autoCompleteView.render(words);
        })
    }
}

