import { $, classAdd, classRemove } from './util.js';

const SearchList = function () {
    this.searchResult = $(".search-result-list");
}

SearchList.prototype = {
    constructor: SearchList,

    renderList(data, input = "") {
        let temp = "";
        data.forEach(word => {
            const restWord = word.substr(input.length);
            temp += `<li><span style="color:#F90;">${input}</span>${restWord}</li>`
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