import SearchEnum from "./SearchEnum.js";

class SearchController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.render();
        this.view.onNotifyRenderFinished();
        this._appendEventHandler();
        this._appendBind();
    }

    _appendEventHandler() {
        const search = document.querySelector('.search');

        search.addEventListener('input', event => this._handleInputEvent(event));
        search.addEventListener('click', event => this._handleClickEvent(event));
    }

    _appendBind() {
        this.model.bindSuggestionChanged(this.onSuggestionChanged.bind(this));
    }

    _handleInputEvent(event) {
        if (event.target === document.querySelector('.searchInputField')) {
            if (0 === event.target.value.length) {
                this.model.setSuggestion([]);
            }
            else {
                this._fetchExtractedWords(event.target.value);    
            }
        }
    }

    _handleClickEvent(event) {
        if (event.target === document.querySelector('.searchBackground')) {
            this.view.onNotifyBackgroundClicked();
        }
        else if (event.target === document.querySelector('.searchButton')) {
            this.view.onNotifySearchButtonClicked();
        }
        else if (event.target === document.querySelector('.searchInputField')) {

        }
        else if (event.target === document.querySelector('.search')) {
        }
        else {
            this.view.onNotifyListElementClicked(event.target);
        }
    }
    
    _fetchExtractedWords(inputFieldText) {
        const data = {userInputText: inputFieldText};

        fetch('http://220.78.96.186:8080', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(extractedWords => {
            this._onExtractedWordsReceived(extractedWords)
        });
    }

    _onExtractedWordsReceived(extractedWords) {
        this.model.setSuggestion(extractedWords);
    }

    onSuggestionChanged(extractedWords) {
        this.view.onNotifySuggestionChanged(extractedWords);
    }
}

export default SearchController;
