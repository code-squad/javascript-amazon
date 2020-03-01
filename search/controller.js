import { _$, _$on, _$ca, _$cr } from '/util.js';
// import { searchFetchOption } from '/config.js';

export function SearchController({ model, inputView, autoCompleteView, controllerOption }) {
    this.model = model;
    // this.inputVeiw = inputView;
    this.autoCompleteView = autoCompleteView;
    // this.option = controllerOption;
    // this.oldValue = null;
    this.timer = null;
}

SearchController.prototype = {


    onAutoCompleteEvent() {
        const searchInput = _$('#search__input');
        const searchField = _$('.search__container')
        _$on(searchInput, 'click', () => _$ca(searchField, 'active'));
        _$on(searchInput, 'blur', () => _$cr(searchField, 'active'));
        _$on(searchInput, 'input', () => this.debouncing(200, this.getSearchWords));

        // searchInput.addEventListener('input', () => this.debouncing(200, this.getSearchWords))
        // searchInput.addEventListener('click', () => searchField.classList.add('active'))
        // searchInput.addEventListener('blur', () => searchField.classList.remove('active'))
    },

    debouncing(delayTime, func) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            func.call(this);
        }, delayTime)
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

