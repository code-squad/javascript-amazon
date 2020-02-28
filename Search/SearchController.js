import SEARCH_ENUM from "./SearchEnum.js";
const SEARCH_AJAX_INFORMATION = SEARCH_ENUM.SEARCH_AJAX_INFORMATION;
const SEARCH_STATUS = SEARCH_ENUM.SEARCH_STATUS;

class SearchController {
    constructor(model, view) {
        this._currentStatus = SEARCH_STATUS.NORMAL;

        this._model = model;
        this._view = view;

        this._view.appendHandler({
            keyInputHandler: this._handleKeyInput.bind(this),
            dimmedBackgroundClickHandler: this._handleDimmedBackgroundClick.bind(this),
            suggestionClickHandler: this._handleSuggestionClick.bind(this),
            searchButtonClickHandler: this._handleSearchButtonClick.bind(this),
            arrowUpPressHandler: this._handleArrowUpPress.bind(this),
            arrowDownPressHandler: this._handleArrowDownPress.bind(this),
            suggestionEnterHandler: this._handleSuggestionEnter.bind(this),
        });

        this._view.render();
        this._view.onNotifyRenderFinished();
    }

    _setLocalstorageData(text, suggestionList) {
        localStorage.setItem(text, suggestionList);
    }
   
    _fetchExtractedWords(inputFieldText) {
        const data = {userInputText: inputFieldText};
        const cachedData = localStorage.getItem(inputFieldText);

        if (cachedData) {
            setTimeout(() => {
                this._onExtractedWordsReceived(JSON.parse(cachedData))
            }, 300);
        }
        else {
            fetch(SEARCH_AJAX_INFORMATION.URL, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(suggestionData => {
                setTimeout(() => {
                    this._onExtractedWordsReceived(suggestionData)
                }, 300);
            });
        }
    }

    _onExtractedWordsReceived(suggestionData) {
        this._setLocalstorageData(suggestionData.userInputText, JSON.stringify(suggestionData));

        if (this._model.getCurrentText() !== suggestionData.userInputText) 
            return;

        if (suggestionData.suggestionList.length) {
            this._model.setSuggestion(suggestionData.suggestionList);
            this._view.onNotifyCurrentStatusChanged(SEARCH_STATUS.AUTOCOMPLETION);
        }
        else {
            this._model.setSuggestion({});
            this._view.onNotifyCurrentStatusChanged(SEARCH_STATUS.NORMAL);
        }
    }

    onCurrentIndexChanged(currentIndex) {
        this._view.onNotifyCurrentIndexChanged(currentIndex);
    }

    _handleDimmedBackgroundClick(event) {
        this._view.onNotifyCurrentStatusChanged(SEARCH_STATUS.NORMAL);
    }

    _handleSuggestionClick(event) {
        this._model.setCurrentText(event.target.innerHTML);
        this._view.onNotifyCurrentStatusChanged(SEARCH_STATUS.NORMAL);
    }

    _handleSearchButtonClick(event) {
    }

    _handleArrowUpPress(event) {
        this._model.decreaseCurrentIndex();
    }

    _handleArrowDownPress(event) {
        this._model.increaseCurrentIndex();
    }

    _handleSuggestionEnter(event) {
        const focusedElement = (document.querySelector(".searchSuggestion").querySelectorAll("li"))[this._model.getCurrentIndex()];
        focusedElement.click();
    }

    _handleKeyInput(event) {
        if (0 === event.target.value.length) {
            this._model.setCurrentText(event.target.value)
            this._model.setSuggestion([]);
            this._view.onNotifyCurrentStatusChanged(SEARCH_STATUS.NORMAL);
        }
        else {
            this._model.setCurrentText(event.target.value)
            this._fetchExtractedWords(event.target.value);
        }
    }
}

export default SearchController;
