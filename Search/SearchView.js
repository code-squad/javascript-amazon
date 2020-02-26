import SearchInputView from "./SearchInputView.js";
import SearchAutoCompletionView from "./SearchAutoCompletionView.js";
import SearchBackgroundView from "./SearchBackgroundView.js";
import SearchRecentlyView from "./SearchRecentlyView.js";
import SearchEnum from "./SearchEnum.js";

class SearchView {
    constructor() {
        this.view = [];

        this.searchInputView = new SearchInputView();
        this.searchAutoCompletionView = new SearchAutoCompletionView();
        this.searchBackgroundView = new SearchBackgroundView();
        this.searchRecentlyView = new SearchRecentlyView();

        this._registerView(this.searchInputView);
        this._registerView(this.searchAutoCompletionView);
        this._registerView(this.searchBackgroundView);
        this._registerView(this.searchRecentlyView);
    }

    _registerView(view) {
        this.view.push(view);
    }

    render() {
        const result = '<div class="search">' + 
                        this.searchBackgroundView.render() + 
                        this.searchInputView.render() + 
                        this.searchAutoCompletionView.render() + 
                        '</div>';

        document.querySelector(".wrap").insertAdjacentHTML('afterbegin', result);
    }

    onNotifyRenderFinished() {
        this.view.forEach(element => {
            element.onNotifyRenderFinished();
        });
    }

    onNotifySuggestionChanged(suggestion) {
        this.view.forEach(element => {
            element.onNotifySuggestionChanged(suggestion);
        });
    }

    onNotifyBackgroundClicked() {
        this.view.forEach(element => {
            element.onNotifyBackgroundClicked();
        });
    }

    onNotifyListElementSelected(text, index = null) {
        this.view.forEach(element => {
            element.onNotifyListElementSelected(text);
        });
    }

    onNotifyCurrentIndexChanged(currentIndex) {
        this.view.forEach(element => {
            element.onNotifyCurrentIndexChanged(currentIndex);
        });
    }
}

export default SearchView;