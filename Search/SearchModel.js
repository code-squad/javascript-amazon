import SearchEnum from "./SearchEnum.js";

class SearchModel {
    constructor() {
        this._suggestion = [];
        this._currentIndex = null;
        this._currentText = '';

        this._onSuggestionChanged = null;
        this._onCurrentIndexChanged = null;
    }

    setCurrentText(text) {
        this._currentText = text;
    }

    getCurrentText() {
        return this._currentText;
    }

    setSuggestion(suggestion) {
        this._clearCurrentIndex();
        this._suggestion = suggestion;
        this._onSuggestionChanged(this._suggestion);
    }

    getSuggestion() {
        return this._suggestion;
    }

    bindSuggestionChanged(callback) {
        this._onSuggestionChanged = callback;
    }

    getCurrentIndex() {
        return this._currentIndex;
    }

    increaseCurrentIndex() {
        if (this._currentIndex === null) {
            this._currentIndex = 0;
        }
        else if (this._currentIndex < this._suggestion.length - 1) {
            this._currentIndex += 1;
        }
        else if (this._currentIndex === this._suggestion.length - 1) {
            this._currentIndex = null;
        }

        this._onCurrentIndexChanged(this._currentIndex);
    }

    decreaseCurrentIndex() {
        if (this._currentIndex === null) {
            this._currentIndex = this._suggestion.length - 1;
        }
        else if (this._currentIndex > 0) {
            this._currentIndex -= 1;
        }
        else if (this._currentIndex === 0) {
            this._currentIndex = null;
        }

        this._onCurrentIndexChanged(this._currentIndex);
    }

    _clearCurrentIndex() {
        this._currentIndex = null;

        this._onCurrentIndexChanged(this._currentIndex);
    }

    bindCurrentIndexChanged(callback) {
        this._onCurrentIndexChanged = callback;
    }
}

export default SearchModel;