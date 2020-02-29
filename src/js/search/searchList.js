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
        this.searchList.addEventListener("mousedown", this.searchListClick.bind(this));
    },

    listInit() {
        this.isListOn = false;
        this.prevList = null;
        this.curList = null;
        this.nextList = null;
    },

    searchListMove(evt) {
        if (!this.isListOn) return
        switch (evt.key) {
            case "ArrowDown": {
                evt.preventDefault();
                this.listMove(true);
            }
                break;
            case "ArrowUp": {
                evt.preventDefault();
                this.listMove(false);
            }
                break;
            case "Enter": {
                if (this.curList !== null) {
                    this.searchInput.value = this.curList.innerText;
                    classRemove(taek$(".search-blind"), "on");
                    this.searchListOff();
                    this.listInit();
                }
            }
                break;
        }
    },

    listMove(isKeyDown) {
        if (this.curListStateCheck(isKeyDown)) {
            this.curList = isKeyDown ? this.searchList.firstElementChild : this.searchList.lastElementChild;
        } else {
            this.curList = isKeyDown ? this.nextList : this.prevList;
            this.prevList = this.curList;
            this.nextList = this.curList;
        }
        this.listHighlightControl(this.curList, isKeyDown ? this.curList.previousElementSibling : this.curList.nextElementSibling);
        this.nextList = this.curList.nextElementSibling;
        this.prevList = this.curList.previousElementSibling;
    },

    curListStateCheck(isKeyDown) {
        if (this.curList === this.searchList.firstElementChild && !isKeyDown) return true
        if (this.curList === this.searchList.lastElementChild && isKeyDown) return true
        if (this.curList === null) return true
        return false
    },

    searchListClick({ target }) {
        if (!this.isListOn) return
        this.searchInput.value = target.innerText;
    },

    listHighlightControl(curList, prev) {
        if (prev !== null) classRemove(prev, "on");
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
            return acc + `<li ${isListOn ? '' : 'style="color:#a7a7a7;'}><span style="color:#F90;">${userInput}</span>${restWord}</li>`;
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