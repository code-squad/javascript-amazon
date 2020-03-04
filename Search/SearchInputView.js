import SEARCH_ENUM from "./SearchEnum.js";
const SEARCH_STATUS = SEARCH_ENUM.SEARCH_STATUS;

class SearchInputView {
    constructor() {
        this.searchInput = null;

        this._onArrowKeyPressed = null;
        this._onKeyInputted = null;
        this._onSuggestionEntered = null;
        this._onSearchButtonClicked = null;
        this._onInputFieldClicked = null;
    }

    render() {
        return `
        <div class="searchBox">
            <input type="text" class="searchInputField" placeholder="What are you looking for?">
            <button type="submit" class="searchButton">
                <i class="fa fa-search"></i>
            </button>
        </div>
        `
    }

    appendHandler(callbacks) {
        this._onArrowKeyPressed = callbacks.onArrowKeyPressed;
        this._onKeyInputted = callbacks.onKeyInputted;
        this._onSuggestionEntered = callbacks.onSuggestionEntered;
        this._onSearchButtonClicked = callbacks.onSearchButtonClicked;
        this._onInputFieldClicked = callbacks.onInputFieldClicked;
    }

    onNotifyRenderFinished() {
        this.searchBox = document.querySelector(".searchBox");
        this.searchInput = document.querySelector(".searchInputField");
        
        this._appendEventHandler()
    }

    _appendEventHandler() {
        this.searchBox.addEventListener('input', event => this._onKeyInputted(event));
        this.searchBox.addEventListener('keydown', event => {
            if (event.code === 'Enter') {
                this._onSuggestionEntered(event);
            }
            else {
                this._onArrowKeyPressed(event);    
            }
        });
        this.searchBox.addEventListener('click', event => {
            if (event.target.className === 'searchInputField') {
                this._onInputFieldClicked(event);
            }
            else {
                this._onSearchButtonClicked(event);
            }
        })
    }

    onNotifyCurrentTextChanged(text) {
        this.searchInput.value = text;
    }

    onNotifyCurrentIndexChanged(currentIndex) {
    }

    onNotifyCurrentStatusChanged(currentStatus) {
    }
}

export default SearchInputView;