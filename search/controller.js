import { _$, _$e, _$c, __$ } from '/util.js';
import { controllerInfo } from './config.js';

export function SearchController({ model, searchBarView, autoCompleteView }) {
    this.model = model;
    this.searchBarView = searchBarView;
    this.autoCompleteView = autoCompleteView;
    this.keyDownCount = 0;
    this.searchField = _$(controllerInfo.searchField);
    this.searchInput = _$(controllerInfo.searchInput);
    this.option = controllerInfo.option;
    this.maxSuggestionLength = this.option.maxSuggestionLength || 9;
    this.delayTime = this.option.delayTime || 300;
}

SearchController.prototype = {

    onAutoCompleteEvent() {
        if (this.option.inputFocus) 
        this.autoCompleteView.onInputFocusEvent(this.searchField ,this.searchInput);

        __$(this.searchInput)
            .on('input', () => _$e.debounce(this.delayTime, this, this.getMatchingTerms));

        __$(this.searchField)
            .on('keydown', (event) => this.onKeydownHandler(event));
    },

    onKeydownHandler(event) {
        const searchChildren = [...event.currentTarget.children];
        const suggestionBoxIndex = searchChildren.indexOf(this.autoCompleteView.suggestionBox);
        const suggestionsList = searchChildren[suggestionBoxIndex].children;
        const suggestionLength = suggestionsList.length;
        
        switch (event.key) {

            case 'Enter':
                event.preventDefault();
                this.pressEnter(suggestionsList, event.target);
                break;

            case 'ArrowUp':
                event.preventDefault();
                this.pressArrowUp(suggestionsList, suggestionLength);
                break;

            case 'ArrowDown':
                event.preventDefault();
                this.pressArrowDown(suggestionsList, suggestionLength);
                break;
        }
    },

    pressEnter(suggestionsList, searchInput) {
        const offScreen = this.keyDownCount <= 0 ;
        if( offScreen ) return this.autoCompleteView.hideSuggestionBox();

        const currentSelectedTerm = suggestionsList[this.keyDownCount - 1];
        this.autoCompleteView.selecteSearchTerm(searchInput, currentSelectedTerm);
    },

    pressArrowUp(suggestionsList, suggestionLength) {
        this.keyDownCount--;
        const outOfRange = this.keyDownCount < 0;
        if(outOfRange) this.keyDownCount = suggestionLength;

        this.controlSelectedTerm(suggestionsList);
    },

    pressArrowDown(suggestionsList, suggestionLength) {
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
