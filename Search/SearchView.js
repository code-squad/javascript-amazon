import SearchInputView from "./SearchInputView.js";
import SearchAutocompletionView from "./SearchAutocompletionView.js";
import SearchBackgroundView from "./SearchBackgroundView.js";
import SearchRecentlyView from "./SearchRecentlyView.js";
import SearchEnum from "./SearchEnum.js";

class SearchView {
    constructor() {
        this.searchInputView = new SearchInputView();
        this.searchAutocompletionView = new SearchAutocompletionView();
        this.searchBackgroundView = new SearchBackgroundView();
        this.searchRecentlyView = new SearchRecentlyView();
    }

    render() {
        const result = '<div class="search">' + 
                        this.searchBackgroundView.render() + 
                        this.searchInputView.render() + 
                        this.searchAutocompletionView.render() + 
                        '</div>';
                        
        document.querySelector(".wrap").insertAdjacentHTML('afterbegin', result);
    }
}

export default SearchView;