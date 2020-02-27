import { $, classAdd, classRemove } from './util.js';

const SearchBar = function (searchList) {
    this.searchBar = $(".search-bar");
    this.serachBlind = $(".search-blind");
    this.searchList = searchList;
    this.timer = null;
}

SearchBar.prototype = {
    constructor: SearchBar,

    searchInputFocus() {
        classAdd(this.searchBar, "on");
    },

    searchInputFocusout() {
        classRemove(this.searchBar, "on");
        classRemove(this.serachBlind, "on");
        this.searchList.searchResultOff();
    },

    serachInputInsertData(evt) {
        clearTimeout(this.timer);
        const input = evt.target.value;
        if (input === "") {
            this.searchList.searchResultOff();
            classRemove(this.serachBlind, "on");
        } else {
            this.timer = setTimeout(this.wordDataRequest.bind(this), 300, input);
        }
    },

    wordDataRequest(input) {
        fetch("http://localhost:8080/wordSearch", {
            method: 'POST',
            body: input
        })
            .then(rep => rep.json())
            .then(json => {
                if (json.length > 0) {
                    this.searchList.renderList(json, input);
                } else {
                    this.searchList.renderList(["일치하는 결과가 없습니다"]);
                }
                classAdd(this.serachBlind, "on");
            });
    },

    run() {
        const searchInput = $(".search-input");
        searchInput.addEventListener("focus", this.searchInputFocus.bind(this));
        searchInput.addEventListener("focusout", this.searchInputFocusout.bind(this));
        searchInput.addEventListener("input", this.serachInputInsertData.bind(this));
    }
}

export default SearchBar;