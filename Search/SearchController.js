import SEARCH_ENUM from "./SearchEnum.js";
const SEARCH_AJAX_INFORMATION = SEARCH_ENUM.SEARCH_AJAX_INFORMATION;
const SEARCH_STATUS = SEARCH_ENUM.SEARCH_STATUS;
const SEARCH_TIMEOUT = SEARCH_ENUM.SEARCH_TIMEOUT;
const SEARCH_CACHE_INFORMATION = SEARCH_ENUM.SEARCH_CACHE_INFORMATION;

class SearchController {
    constructor(model, view) {
        this._currentStatus = SEARCH_STATUS.NORMAL;

        this._model = model;
        this._view = view;

        this._deboundTimer = null;

        this._view.appendHandler({
            keyInputHandler: this._handleKeyInput.bind(this),
            dimmedBackgroundClickHandler: this._handleDimmedBackgroundClick.bind(this),
            suggestionClickHandler: this._handleSuggestionClick.bind(this),
            searchButtonClickHandler: this._handleSearchButtonClick.bind(this),
            arrowUpPressHandler: this._handleArrowUpPress.bind(this),
            arrowDownPressHandler: this._handleArrowDownPress.bind(this),
            suggestionEnterHandler: this._handleSuggestionEnter.bind(this),
            inputFieldClickHandler: this._handleInputFieldClicked.bind(this)
        });

        this._view.render();
        this._view.onNotifyRenderFinished();
    }

    _setCurrentStauts(currentStatus) {
        this._currentStatus = currentStatus;

        this._view.onNotifyCurrentStatusChanged(this._currentStatus);
    }

    _setLocalstorageData(text, suggestionList) {
        localStorage.setItem(text, suggestionList);
    }

    _appendLocalstorageRecentData(text) {
        let cachedData = JSON.parse(localStorage.getItem(SEARCH_CACHE_INFORMATION.KEY));
        const spliceCount = 1;

        if (!cachedData) {
            cachedData = [];
        }

        for (let index = 0 ; index < cachedData.length ; ++index) {
            if (text === cachedData[index]) {
                cachedData.splice(index, spliceCount);
                break;
            }
        }

        if (cachedData.length >= SEARCH_CACHE_INFORMATION.MAX_CACHE_COUNT) {
            cachedData.splice(cachedData.length - 1, spliceCount);
        }

        cachedData.push(text);
        localStorage.setItem(SEARCH_CACHE_INFORMATION.KEY, JSON.stringify(cachedData));
    }
   
    _fetchExtractedWords(inputFieldText) {
        const data = {userInputText: inputFieldText};
        const cachedData = localStorage.getItem(inputFieldText);

        clearTimeout(this._deboundTimer);

        if (cachedData) {
            this._deboundTimer = setTimeout(() => {
                this._onExtractedWordsReceived(JSON.parse(cachedData))
            }, SEARCH_TIMEOUT.CACHED);
        }
        else {
            this._deboundTimer = setTimeout(() => {
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
                    this._onExtractedWordsReceived(suggestionData)
                });
            }, SEARCH_TIMEOUT.REQUEST);
        }
    }

    _onExtractedWordsReceived(suggestionData) {
        this._setLocalstorageData(suggestionData.userInputText, JSON.stringify(suggestionData));

        if (this._model.getCurrentText() !== suggestionData.userInputText) 
            return;

        if (suggestionData.suggestionList.length) {
            this._model.setSuggestion(suggestionData.suggestionList);
            this._setCurrentStauts(SEARCH_STATUS.AUTOCOMPLETION);
        }
        else {
            this._model.setSuggestion({});
            this._setCurrentStauts(SEARCH_STATUS.NORMAL);
        }
    }

    onCurrentIndexChanged(currentIndex) {
        this._view.onNotifyCurrentIndexChanged(currentIndex);
    }

    _handleDimmedBackgroundClick(event) {
        this._setCurrentStauts(SEARCH_STATUS.NORMAL);
    }

    _handleSuggestionClick(event) {
        this._model.setCurrentText(event.target.innerHTML);
        this._setCurrentStauts(SEARCH_STATUS.NORMAL);
    }

    _handleSearchButtonClick(event) {
        if (this._model.getCurrentText() === '') 
            return;

        this._setCurrentStauts(SEARCH_STATUS.NORMAL);
        this._appendLocalstorageRecentData(event.currentTarget.firstElementChild.value);
    }

    _handleArrowUpPress(event) {
        this._model.decreaseCurrentIndex();
    }

    _handleArrowDownPress(event) {
        this._model.increaseCurrentIndex();
    }

    _handleSuggestionEnter(event) {
        const listElements = document.querySelector(".searchSuggestion").querySelectorAll("li");
        const focusedElement = listElements[this._model.getCurrentIndex()];
        focusedElement.click();
    }

    _handleKeyInput(event) {
        if (0 === event.target.value.length) {
            this._model.setCurrentText(event.target.value)
            const cachedData = JSON.parse(localStorage.getItem(SEARCH_CACHE_INFORMATION.KEY));

            if (cachedData) {
                this._model.setSuggestion(cachedData);
                this._setCurrentStauts(SEARCH_STATUS.RECENT_SEARCH);
            }
            else {
                this._setCurrentStauts(SEARCH_STATUS.NORMAL);
            }
        }
        else {
            this._model.setCurrentText(event.target.value)
            this._fetchExtractedWords(event.target.value);
        }
    }

    _handleInputFieldClicked(event) {
        const cachedData = JSON.parse(localStorage.getItem(SEARCH_CACHE_INFORMATION.KEY));

        if (this._currentStatus === SEARCH_STATUS.NORMAL && 
            !this._model.getCurrentText()) {

            if (cachedData) {
                this._model.setSuggestion(cachedData);
                this._setCurrentStauts(SEARCH_STATUS.RECENT_SEARCH);
            }
            else {
                this._setCurrentStauts(SEARCH_STATUS.NORMAL);
            }
        }
    }
}

export default SearchController;
