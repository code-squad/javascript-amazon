import SEARCH_ENUM from "./SearchEnum.js";
const SEARCH_STATUS = SEARCH_ENUM.SEARCH_STATUS;

class SearchAutoCompletionView {
    constructor(callbacks) {
        this._searchDimmedBackground = null;
        this._searchSuggestion = null;

        this._onDimmedBackgroundClicked = null;
        this._onSuggestionClicked = null;
    }

    render() {
        return `
            <div class="searchDimmedBackground">
            </div>
            <ul class="searchSuggestion">
            </ul>
        `;
    }

    appendHandler(callbacks) {
        this._onDimmedBackgroundClicked = callbacks.onDimmedBackgroundClicked;
        this._onSuggestionClicked = callbacks.onSuggestionClicked;
    }

    onNotifyRenderFinished() {
        this._searchDimmedBackground = document.querySelector(".searchDimmedBackground");
        this._searchSuggestion = document.querySelector(".searchSuggestion");

        this._appendEventHandler();
    }

    _appendEventHandler() {
        this._searchDimmedBackground.addEventListener('click', event => this._onDimmedBackgroundClicked(event));
        this._searchSuggestion.addEventListener('click', event => this._onSuggestionClicked(event));
    }

    _appendList(suggestion) {
        suggestion.forEach(element => {
            this._searchSuggestion.insertAdjacentHTML('afterbegin', `<li>${element}</li>`);
        });
    }

    _clearList() {
        while(this._searchSuggestion.hasChildNodes()) {
            this._searchSuggestion.removeChild(this._searchSuggestion.firstChild);
        }
    }

    _changeHeight(height) {
        this._searchSuggestion.style.height = height + 'px';
    }

    _changeVisibility(visibility) {
        this._searchDimmedBackground.style.visibility = visibility;
        this._searchSuggestion.style.visibility = visibility;
    }

    onNotifyCurrentIndexChanged(currentIndex) {
        let listElements = this._searchSuggestion.querySelectorAll("li");

        if (currentIndex !== null) {
            listElements.forEach((element, index) => {
                element.className = currentIndex === index ? 'selected' : '';
            });
        }
        else {
            listElements.forEach((element, index) => {
                element.className = '';
            });
        }
    }

    onNotifySuggestionListChanged(listElements) {
        if (listElements.length) {
            this._clearList();
            this._appendList(listElements);
            this._changeHeight(this._searchSuggestion.childElementCount * parseInt(getComputedStyle(this._searchSuggestion.firstElementChild, null).getPropertyValue("height")));
        }
        else {
            this._clearList();
        }
    }

    onNotifyCurrentStatusChanged(currentStatus) {
        if (SEARCH_STATUS.AUTOCOMPLETION === currentStatus) {
            this._changeVisibility("visible");
        }
        else {
            this._changeVisibility("hidden");
        }
    }
}

export default SearchAutoCompletionView;
