import SearchEnum from "./SearchEnum.js";

class SearchModel {
    constructor(view) {
        this._view = view;
        this._suggestion = [];
        this._currentIndex = null;
        this._currentText = '';
    }

    setCurrentText(text) {
        this._currentText = text;

        this._view.onNotifyCurrentTextChanged(text);
    }

    getCurrentText() {
        return this._currentText;
    }

    setSuggestion(suggestion) {
        this._clearCurrentIndex();
        this._suggestion = suggestion;

        this._view.onNotifySuggestionListChanged(suggestion);
    }

    getSuggestion() {
        return this._suggestion;
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

        this._view.onNotifyCurrentIndexChanged(this._currentIndex);
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

        this._view.onNotifyCurrentIndexChanged(this._currentIndex);
    }

    _clearCurrentIndex() {
        this._currentIndex = null;

        this._view.onNotifyCurrentIndexChanged(this._currentIndex);
    }
}

export default SearchModel;