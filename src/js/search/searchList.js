import { taek$, classAdd, classRemove } from '../lib/util.js';

const SearchList = function () {
    this.searchList = taek$(".search-result-list");
}

SearchList.prototype = {
    constructor: SearchList,

    searchListRender(data, userInput = "") {
        this.searchList.innerHTML = data.reduce((acc, word) => {
            const restWord = word.substr(userInput.length);
            return acc + `<li><span style="color:#F90;">${userInput}</span>${restWord}</li>`;
        }, "");
        this.searchListOn();
    },

    searchListOn() {
        classAdd(this.searchList, "on");
    },

    searchListOff() {
        classRemove(this.searchList, "on");
    }
}

export default SearchList;