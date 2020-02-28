import { taek$, classAdd, classRemove } from '../lib/util.js';

const SearchList = function () {
    this.searchList = taek$(".search-result-list");
    this.searchInput = taek$(".search-input");
    this.init();
    this.listInit();
}

SearchList.prototype = {
    constructor: SearchList,

    init() {
        this.searchInput.addEventListener("keydown", this.searchListMove.bind(this));
    },

    listInit() {
        this.isListOn = false;
        this.prevList = null;
        this.curList = null;
        this.nextList = null;
    },

    searchListMove({ key }) {
        if (!this.isListOn) return
        switch (key) {
            case "ArrowDown": {
                if (this.curList === this.searchList.lastElementChild || this.curList === null) this.curList = this.searchList.firstElementChild;
                else {
                    this.prevList = this.curList;
                    this.curList = this.nextList;
                }
                this.listHighlightControl(this.curList, this.curList.previousElementSibling);
                this.nextList = this.curList.nextElementSibling;
            }
                break;
            case "ArrowUp": {
                if (this.curList === this.searchList.firstElementChild || this.curList === null) this.curList = this.searchList.lastElementChild;
                else {
                    this.nextList = this.curList;
                    this.curList = this.prevList;
                }
                this.listHighlightControl(this.curList, this.curList.nextElementSibling);
                this.prevList = this.curList.previousElementSibling;
            }
                break;
            case "Enter": {
                this.searchInput.value = this.curList.innerText;
                classRemove(taek$(".search-blind"), "on");
                this.searchListOff();
                this.listInit();
            }
                break;
        }
    },

    listHighlightControl(curList, prevList) {
        if (prevList !== null) classRemove(prevList, "on");
        else {
            classRemove(this.searchList.firstElementChild, "on");
            classRemove(this.searchList.lastElementChild, "on");
        }
        classAdd(curList, "on");
    },

    searchListRender(data, userInput = "", isListOn = false) {
        this.listInit();
        this.isListOn = isListOn;
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