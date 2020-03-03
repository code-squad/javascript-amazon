import { _$, _$e, _$c, __$ } from '/util.js';
// import { searchFetchOption } from '/config.js';

export function SearchController({ model, inputView, autoCompleteView, controllerOption }) {
    this.model = model;
    // this.inputVeiw = inputView;
    this.autoCompleteView = autoCompleteView;
    // this.option = controllerConfig;
    this.keyDownCount = 0;
    this.maxSearchTerms = 9; //옵션
    this.searchField = _$('#search') // 옵션
    this.searchInput = _$('#search__input') //옵션
}

SearchController.prototype = {

    onAutoCompleteEvent() {
        //옵션기능
        __$(this.searchInput).on('click', () => _$c(this.searchField).add('active'));
        __$(this.searchInput).on('blur', () => {
            _$c(this.searchField).remove('active')
            this.autoCompleteView.hideSuggestions()
        });
        /////
        ///300옵션기능
        __$(this.searchInput).on('input', () => _$e.debounce(300, this, this.getSearchTerms));

        __$(this.searchField).on('keydown', this.onKeydownHandler.bind(this), false);
        //세번째 인자 알아보기

    },

    onKeydownHandler(event) {
        const suggestions = event.currentTarget.childNodes[3].childNodes;
        const suggestionLength = suggestions.length;

        switch (event.keyCode) {
            case 13:
                this.prssEnter(suggestions, event.target);
                break;

            case 38:
                this.pressUpArrow(suggestions, suggestionLength);
                break;

            case 40:
                this.pressDownArrow(suggestions, suggestionLength);
                break;
        }
    },

    pressUpArrow(suggestions, suggestionLength) {
        const lastKeyCount = suggestionLength + 1;

        this.keyDownCount--;
        this.controlSelectedTerm(suggestions, lastKeyCount);
    },

    pressDownArrow(suggestions, suggestionLength) {
        const firstKeyCount = 0;
        const conditionToRemoveSelected = suggestionLength < this.keyDownCount;

        this.keyDownCount++;
        this.controlSelectedTerm(suggestions, firstKeyCount, conditionToRemoveSelected);
    },

    controlSelectedTerm(suggestions, keyCountInit, condition) {
        const currentSelectedTerm = suggestions[this.keyDownCount - 1];

        event.preventDefault();
        if (!currentSelectedTerm || condition) {
            this.autoCompleteView.removeSelectedTerm();
            return this.keyDownCount = keyCountInit;
        }

        this.autoCompleteView.paintSelectedTerm(currentSelectedTerm);
    },

    pressEnter(suggestions, searchInput) {
        const currentSelectedTerm = suggestions[this.keyDownCount - 1];

        event.preventDefault();
        this.autoCompleteView.selecteSearchTerm(searchInput, currentSelectedTerm);
    },

    getSearchTerms() {
        const searchTerm = this.searchInput.value;

        this.keyDownCount = 0;
        if (!searchTerm) return this.autoCompleteView.hideSuggestions();
        const searchTermLength = searchTerm.length;
        const matchingTerms = this.model.findMatchingTerms(searchTerm);
        matchingTerms.then(terms => {
            if (!terms.length) return this.autoCompleteView.hideSuggestions();
            const suggestedTerms = terms.slice(0, this.maxSearchTerms);
            this.autoCompleteView.render(suggestedTerms, searchTermLength);
        })
    }
}
