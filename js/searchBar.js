import { $, classAdd, classRemove } from './util.js';

const SearchBar = function (serachList) {
    this.searchBar = $(".search-bar");
    this.searchInput = $(".search-input");
    this.serachBlind = $(".search-blind");
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
    },

    serachInputInsertData(evt) {
        clearTimeout(this.timer);
        const input = evt.target.value;
        if (input === "") {
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
                    classAdd(this.serachBlind, "on");
                    console.log(json);
                } else {
                    classRemove(this.serachBlind, "on");
                }
            });
    },

    run() {
        this.searchInput.addEventListener("focus", this.searchInputFocus.bind(this));
        this.searchInput.addEventListener("focusout", this.searchInputFocusout.bind(this));
        this.searchInput.addEventListener("input", this.serachInputInsertData.bind(this));
    }
}

export default SearchBar;