import SearchEnum from "./SearchEnum.js";

class SearchController {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this._view.render();
        this._view.onNotifyRenderFinished();
        
        this._appendEventHandler();
        this._appendBind();
    }

    _appendEventHandler() {
        const search = document.querySelector('.search');

        search.addEventListener('input', event => this._handleInputEvent(event));
        search.addEventListener('click', event => this._handleClickEvent(event));
        search.addEventListener('keydown', event => this._handleKeyEvent(event));
    }

    _appendBind() {
        this._model.bindSuggestionChanged(this.onSuggestionChanged.bind(this));
        this._model.bindCurrentIndexChanged(this.onCurrentIndexChanged.bind(this));
    }

    _handleInputEvent(event) {
        if (event.target === document.querySelector('.searchInputField')) {
            if (0 === event.target.value.length) {
                this._model.setCurrentText(event.target.value)
                this._model.setSuggestion([]);
            }
            else {
                this._model.setCurrentText(event.target.value)
                this._fetchExtractedWords(event.target.value);
            }
        }
    }

    _handleClickEvent(event) {
        if (event.target === document.querySelector('.searchBackground')) {
            this._view.onNotifyBackgroundClicked();
        }
        else if (event.target === document.querySelector('.searchButton')) {
            this._view.onNotifySearchButtonClicked();
        }
        else if (event.target === document.querySelector('.searchInputField')) {
        }
        else if (event.target === document.querySelector('.search')) {
        }
        else {
            this._view.onNotifyListElementSelected(event.target.innerHTML);
        }
    }

    _handleKeyEvent(event) {
        if (event.key === 'ArrowUp') {
            this._model.decreaseCurrentIndex();
            event.preventDefault();
        }
        else if (event.key === 'ArrowDown') {
            this._model.increaseCurrentIndex();
            event.preventDefault();
        }
        else if (event.key === 'Enter') {
            const focusedElement = (document.querySelector(".searchSuggestion").querySelectorAll("li"))[this._model.getCurrentIndex()];
            focusedElement.click();
        }
    }
    
    _fetchExtractedWords(inputFieldText) {
        const data = {userInputText: inputFieldText};

        fetch(SearchEnum.URL, {
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

    _onExtractedWordsReceived(suggestionData) {
        if (this._model.getCurrentText() !== suggestionData.userInputText) 
            return;

            this._model.setSuggestion(suggestionData.suggestionList);
    }

    onSuggestionChanged(extractedWords) {
        this._view.onNotifySuggestionChanged(extractedWords);
    }

    onCurrentIndexChanged(currentIndex) {
        this._view.onNotifyCurrentIndexChanged(currentIndex);
    }
}

export default SearchController;
