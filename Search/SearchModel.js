import SearchEnum from "./SearchEnum.js";

class SearchModel {
    constructor() {
        this.suggestion = [];
    }

    setSuggestion(suggestion) {
        this.suggestion = suggestion;
        this.onSuggestionChanged(this.suggestion);
    }

    getSuggestion() {
        return this.suggestion;
    }

    bindSuggestionChanged(callback) {
        this.onSuggestionChanged = callback;
    }
}

export default SearchModel;