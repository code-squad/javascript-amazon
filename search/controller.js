import { _$, _$e, _$c, __$ } from '/util.js';
// import { searchFetchOption } from '/config.js';

export function SearchController({ model, inputView, autoCompleteView, controllerOption }) {
    this.model = model;
    // this.inputVeiw = inputView;
    this.autoCompleteView = autoCompleteView;
    // this.option = controllerConfig;
    this.keyDownCount = 0;
    this.maxSuggestions = 9; //옵션
    this.searchField = _$('#search') // 옵션
    this.searchInput = _$('#search__input') //옵션
    this.delayTime = 300;//옵션
    this.inputFocus = true;//옵션
    this.keyCode = {
        enter: 13,
        upArrow: 38,
        downArrow: 40
    };
}

SearchController.prototype = {

    onAutoCompleteEvent() {
        if (this.inputFocus) this.onInputFocusEvent();
        __$(this.searchInput)
            .on('input', () => _$e.debounce(this.delayTime, this, this.getmatchingTerms));

        __$(this.searchField)
            .on('keydown', (event) => this.onKeydownHandler(event));
    },

    onInputFocusEvent() {
        __$(this.searchInput)
            .on('focus', this.autoCompleteView.focusInputBorder
                .bind(this.autoCompleteView, this.searchField));
        __$(this.searchInput)
            .on('blur', this.autoCompleteView.blurInputBorder
                .bind(this.autoCompleteView, this.searchField));
    },

    onKeydownHandler(event) {
        const searchChildren = [...event.currentTarget.children];

        const suggestionBoxIndex = searchChildren.indexOf(this.autoCompleteView.suggestionBox);
        const suggestionsList = searchChildren[suggestionBoxIndex].children;
        const suggestionLength = suggestionsList.length;

        switch (event.keyCode) {

            case this.keyCode.enter:
                event.preventDefault();
                this.pressEnter(suggestionsList, event.target);
                break;

            case this.keyCode.upArrow:
                event.preventDefault();
                this.pressUpArrow(suggestionsList, suggestionLength);
                break;

            case this.keyCode.downArrow:
                event.preventDefault();
                this.pressDownArrow(suggestionsList, suggestionLength);
                break;
        }
    },

    pressEnter(suggestionsList, searchInput) {
        const currentSelectedTerm = suggestionsList[this.keyDownCount - 1];

        this.autoCompleteView.selecteSearchTerm(searchInput, currentSelectedTerm);
    },

    pressUpArrow(suggestionsList, suggestionLength) {
        const lastKeyCount = suggestionLength + 1;
        // const conditionToRemoveSelected = suggestionLength < this.keyDownCount;

        this.keyDownCount--;
        this.controlSelectedTerm(suggestionsList, lastKeyCount);
    },


    pressDownArrow(suggestionsList, suggestionLength) {
        const firstKeyCount = 0;
        const conditionToRemoveSelected = this.keyDownCount < 0;

        this.keyDownCount++;
        this.controlSelectedTerm(suggestionsList, firstKeyCount);
    },

    controlSelectedTerm(suggestionsList, keyCountInit, condition) {
        // if(condition) return this.keyDownCount = suggestionsList.length

        let currentSelectedTerm = suggestionsList[this.keyDownCount - 1];
        console.log(this.keyDownCount)
        if (!currentSelectedTerm || condition) {
            this.autoCompleteView.removeSelectedTerm();
            return this.keyDownCount = keyCountInit;
        }
        currentSelectedTerm = suggestionsList[this.keyDownCount - 1];

        this.autoCompleteView.paintSelectedTerm(currentSelectedTerm);
    },

    getmatchingTerms() {
        const searchTerm = this.searchInput.value;
        if (!searchTerm) return this.autoCompleteView.hideSuggestionBox();

        this.keyDownCount = 0;
        const searchTermLength = searchTerm.length;

        this.model.findMatchingTerms(searchTerm)
            .then(matchingTerms => this.makeSuggestionList(matchingTerms, searchTermLength))
    },

    makeSuggestionList(terms, searchTermLength) {
        if (!terms.length) return this.autoCompleteView.hideSuggestionBox();
        const suggestions = terms.slice(0, this.maxSuggestions);

        this.autoCompleteView.render(suggestions, searchTermLength);
    }

}
