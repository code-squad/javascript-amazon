import SearchInputView from "./SearchInputView.js";
import SearchAutoCompletionView from "./SearchAutoCompletionView.js";
import SearchRecentlyView from "./SearchRecentlyView.js";
import SEARCH_ENUM from "./SearchEnum.js";
const SEARCH_STATUS = SEARCH_ENUM.SEARCH_STATUS;

class SearchView {
    constructor() {
        this.view = [];

        this.searchInputView = new SearchInputView();
        this.searchAutoCompletionView = new SearchAutoCompletionView();
        this.searchRecentlyView = new SearchRecentlyView();

        this._registerView(this.searchInputView);
        this._registerView(this.searchAutoCompletionView);
        this._registerView(this.searchRecentlyView);

        this._dimmedBackgroundClickHandler = null;
        this._suggestionClickHandler = null;
        this._searchButtonClickHandler = null;
        this._arrowUpPressHandler = null;
        this._arrowDownPressHandler = null;
        this._suggestionEnterHandler = null;
        this._keyInputHandler = null;
    }

    _registerView(view) {
        this.view.push(view);
    }

    render() {
        const result = '<div class="search">' + 
                        this.searchAutoCompletionView.render() + 
                        this.searchInputView.render() + 
                        '</div>';

        document.querySelector(".wrap").insertAdjacentHTML('afterbegin', result);
    }

    appendHandler(callbacks) {
        this._dimmedBackgroundClickHandler = callbacks.dimmedBackgroundClickHandler;
        this._suggestionClickHandler = callbacks.suggestionClickHandler
        this._searchButtonClickHandler = callbacks.searchButtonClickHandler;
        this._arrowUpPressHandler = callbacks.arrowUpPressHandler;
        this._arrowDownPressHandler = callbacks.arrowDownPressHandler;
        this._suggestionEnterHandler = callbacks.suggestionEnterHandler;
        this._keyInputHandler = callbacks.keyInputHandler;

        this.searchAutoCompletionView.appendHandler({
            onDimmedBackgroundClicked: this._onDimmedBackgroundClicked.bind(this),
            onSuggestionClicked: this._onSuggestionClicked.bind(this)
        });

        this.searchInputView.appendHandler({
            onArrowKeyPressed: this._onArrowKeyPressed.bind(this),
            onKeyInputted: this._onKeyInputted.bind(this),
            onSuggestionEntered: this._onSuggestionEntered.bind(this)
        });
    }

    //Notify to view
    onNotifyRenderFinished() {
        this.view.forEach(element => {
            element.onNotifyRenderFinished();
        });
    }

    onNotifyCurrentIndexChanged(currentIndex) {
        this.view.forEach(element => {
            element.onNotifyCurrentIndexChanged(currentIndex);
        });
    }

    onNotifyCurrentStatusChanged(currentStatus) {
        this.view.forEach(element => {
            element.onNotifyCurrentStatusChanged(currentStatus);
        });
    }

    onNotifyCurrentTextChanged(text) {
        this.searchInputView.onNotifyCurrentTextChanged(text);
    }

    onNotifySuggestionListChanged(listElements) {
        this.searchAutoCompletionView.onNotifySuggestionListChanged(listElements);
    }

    onNotifyRecentlyListChanged(listElements) {
        this.searchRecentlyView.onNotifyRecentSearchChanged(listElements);
    }

    //Notify to controller
    _onDimmedBackgroundClicked(event) {
        this._dimmedBackgroundClickHandler(event);
    }

    _onSuggestionClicked(event) {
        this._suggestionClickHandler(event);
    }

    _onArrowKeyPressed(event) {
        if (event.key === 'ArrowDown') {
            this._arrowDownPressHandler(event);
            event.preventDefault();
        }
        else if (event.key === 'ArrowUp') {
            this._arrowUpPressHandler(event);
            event.preventDefault();
        }
    }

    _onKeyInputted(event) {
        this._keyInputHandler(event);
    }

    _onSuggestionEntered(event) {
        this._suggestionEnterHandler(event);
    }
    //
}

export default SearchView;