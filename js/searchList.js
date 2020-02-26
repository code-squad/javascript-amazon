import { $, classAdd, classRemove } from './util.js';

const SearchList = function () {
    this.searchResult = $(".search-result-list");
}

SearchList.prototype = {
    constructor: SearchList,

    renderList(data) {
        let temp = "";
        data.forEach(word => {
            temp += `<li>${word}</li>`
        });
        this.searchResult.innerHTML = temp;
        this.searchResultOn();
    },

    searchResultOn() {
        classAdd(this.searchResult, "on");
    },

    searchResultOff() {
        classRemove(this.searchResult, "on");
    }
}

export default SearchList;