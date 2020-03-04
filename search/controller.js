import { _$, _$e, _$c, __$ } from '/util.js';
import { controllerConfig } from './config.js';

export function SearchController({ model, inputView, autoCompleteView }) {
    this.model = model;
    // this.inputVeiw = inputView;
    this.autoCompleteView = autoCompleteView;
    this.keyDownCount = 0;
    this.searchField = _$(controllerConfig.searchField);
    this.searchInput = _$(controllerConfig.searchInput);
    this.option = controllerConfig.option;
    this.maxSuggestionLength = this.option.maxSuggestionLength;
}

SearchController.prototype = {

    onAutoCompleteEvent() {
        if (this.option.inputFocus) this.onInputFocusEvent();
        __$(this.searchInput)
            .on('input', () => _$e.debounce(this.option.delayTime, this, this.getMatchingTerms));

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
        const keyCode = {
            enter: 13,
            upArrow: 38,
            downArrow: 40
        };

        switch (event.keyCode) {

            case keyCode.enter:
                event.preventDefault();
                this.pressEnter(suggestionsList, event.target);
                break;

            case keyCode.upArrow:
                event.preventDefault();
                this.pressUpArrow(suggestionsList, suggestionLength);
                break;

            case keyCode.downArrow:
                event.preventDefault();
                this.pressDownArrow(suggestionsList, suggestionLength);
                break;
        }
    },

    pressEnter(suggestionsList, searchInput) {
        const offScreen = this.keyDownCount <= 0 ;
        if( offScreen ) return this.autoCompleteView.hideSuggestionBox();

        const currentSelectedTerm = suggestionsList[this.keyDownCount - 1];
        this.autoCompleteView.selecteSearchTerm(searchInput, currentSelectedTerm);
    },

    pressUpArrow(suggestionsList, suggestionLength) {
        this.keyDownCount--;
        const outOfRange = this.keyDownCount < 0;
        if(outOfRange) this.keyDownCount = suggestionLength;

        this.controlSelectedTerm(suggestionsList);
    },

    pressDownArrow(suggestionsList, suggestionLength) {
        this.keyDownCount++;
        const outOfRange = this.keyDownCount > suggestionLength;
        if(outOfRange) this.keyDownCount = 0;

        this.controlSelectedTerm(suggestionsList);
    },

    controlSelectedTerm(suggestionsList) {
        const offScreen = this.keyDownCount <= 0;
        if(offScreen) return this.autoCompleteView.removeSelectedTerm();

        const currentSelectedTerm = suggestionsList[this.keyDownCount - 1];
        this.autoCompleteView.paintSelectedTerm(currentSelectedTerm);
    },

    getMatchingTerms() {
        const searchTerm = this.searchInput.value;
        if (!searchTerm) return this.autoCompleteView.hideSuggestionBox();

        this.keyDownCount = 0; //key count 초기화
        const searchTermLength = searchTerm.length;

        this.model.findMatchingTerms(searchTerm)
            .then(matchingTerms => this.makeSuggestionList(matchingTerms, searchTermLength))
    },

    makeSuggestionList(terms, searchTermLength) {
        if (!terms.length) return this.autoCompleteView.hideSuggestionBox();
        const suggestions = terms.slice(0, this.maxSuggestionLength);

        this.autoCompleteView.render(suggestions, searchTermLength);
    }
}
