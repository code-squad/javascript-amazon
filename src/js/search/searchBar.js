import URL from '../common/url.js';
import { taek$, classAdd, classRemove } from '../lib/util.js';

const SearchBar = function (searchList) {
    this.searchBar = taek$(".search-bar");
    this.serachBlind = taek$(".search-blind");
    this.searchList = searchList;
    this.userInput = "";
    this.timer = null;
}

SearchBar.prototype = {
    constructor: SearchBar,

    searchInputFocus() {
        classAdd(this.searchBar, "on");
        this.searchList.showRecentSearchList();
    },

    searchInputFocusout() {
        classRemove(this.searchBar, "on");
        classRemove(this.serachBlind, "on");
        this.searchList.searchListOff();
    },

    serachInputInsertData({ target }) {
        clearTimeout(this.timer);
        this.userInput = target.value;
        if (this.userInput === "") {
            this.searchList.searchListOff();
            classRemove(this.serachBlind, "on");
        } else {
            this.timer = setTimeout(this.wordDataRequest.bind(this), 300, this.userInput);
        }
    },

    wordDataRequest(userInput) {
        fetch(URL.PROD.SEARCH_DATA_API, {
            method: 'POST',
            body: userInput
        })
            .then(rep => rep.json())
            .then(this.searchDataDeliver.bind(this));
    },

    searchDataDeliver(data) {
        if (data.length > 0) {
            this.searchList.searchListRender(data, this.userInput, true);
        } else {
            this.searchList.searchListRender(["일치하는 결과가 없습니다"]);
        }
        classAdd(this.serachBlind, "on");
    },

    run() {
        const searchInput = taek$(".search-input");
        searchInput.addEventListener("focus", this.searchInputFocus.bind(this));
        searchInput.addEventListener("focusout", this.searchInputFocusout.bind(this));
        searchInput.addEventListener("input", this.serachInputInsertData.bind(this));
        this.searchBar.addEventListener("submit", this.searchList.cacheRecentSearchList.bind(this.searchList));
    }
}

export default SearchBar;