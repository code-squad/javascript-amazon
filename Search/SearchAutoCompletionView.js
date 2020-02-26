class SearchAutoCompletionView {
    constructor() {
        this.searchSuggestion = null;
    }

    render() {
        return `
        <ul class="searchSuggestion">
        </ul>
        `
    }

    onNotifyRenderFinished() {
        this.searchSuggestion = document.querySelector(".searchSuggestion");
    }

    onNotifySuggestionChanged(suggestion) {
        if (suggestion.length) {
            this._clearList();
            this._appendList(suggestion);
            this._changeVisibility("visible");
            this._changeHeight(this.searchSuggestion.childElementCount * parseInt(getComputedStyle(this.searchSuggestion.firstElementChild, null).getPropertyValue("height")));
        }
        else {
            this._clearList();
            this._changeVisibility("hidden");
        }
    }

    _appendList(suggestion) {
        suggestion.forEach(element => {
            this.searchSuggestion.insertAdjacentHTML('afterbegin', `<li>${element}</li>`);
        });
    }

    _clearList() {
        while(this.searchSuggestion.hasChildNodes()) {
            this.searchSuggestion.removeChild(this.searchSuggestion.firstChild);
        }
    }

    _changeHeight(height) {
        this.searchSuggestion.style.height = height + 'px';
    }

    _changeVisibility(visibility) {
        this.searchSuggestion.style.visibility = visibility;
    }

    onNotifyBackgroundClicked() {
        this._changeVisibility("hidden");
    }

    onNotifyListElementSelected(target) {
        this._changeVisibility("hidden");
    }

    onNotifyCurrentIndexChanged(currentIndex) {
        let listElements = this.searchSuggestion.querySelectorAll("li");

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
}

export default SearchAutoCompletionView;
