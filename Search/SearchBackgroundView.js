class SearchBackgroundView {
    constructor() {
    }

    render() {
        return '<div class="searchBackground"></div>';
    }

    onNotifyRenderFinished() {
        this.searchBackground = document.querySelector(".searchBackground");
    }

    onNotifySuggestionChanged(suggestion) {
        if (suggestion.length) {
            this._changeVisibility("visible");
        }
        else {
            this._changeVisibility("hidden");
        }
    }

    _changeVisibility(visibility) {
        this.searchBackground.style.visibility = visibility;
    }

    onNotifyBackgroundClicked() {
        this._changeVisibility("hidden");
    }

    onNotifyListElementSelected(text) {
        this._changeVisibility("hidden");
    }

    onNotifyCurrentIndexChanged(currentIndex) {
        
    }
}

export default SearchBackgroundView;
