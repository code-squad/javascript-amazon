import options from './options.js';
import URL from '../common/url.js';
import { taek$, taek$$ } from '../lib/util.js';

const { slideOption: option } = options;

class DataRender {
    constructor() {
        this.navWrap = taek$(".slide-nav");
        this.slideWrap = taek$(".slide-item-wrap");
        this.data = null;
        this.init();
    }

    init() {
        this.getData();
    }

    getData() {
        const lacalStorageData = localStorage.getItem(option.slideDataKey);
        if (lacalStorageData) {
            this.data = JSON.parse(lacalStorageData);
        } else {
            fetch(URL.DEV.SLIDE_DATA_API)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem(option.slideDataKey, JSON.stringify(data));
                    this.data = data;
                });
        }
    }

    navDataRender() {
        const navColors = options.navCardColors;
        this.navWrap.innerHTML = this.data.itemContents.reduce((acc, item, idx) => {
            return acc + `<li class=${idx} style="background-color: ${navColors[idx % navColors.length]}; width: ${option.cardWidth}px">${item.navTitle}</li>`;
        }, "");
    }

    slideDataRender() {
        this.slideWrap.innerHTML = this.data.itemContents.reduce((acc, item) => {
            option.itemsCount++;
            return acc + `<li class="slide-item">${this.makeItemImg(item)}${this.makeItemText(item)}</li>`;
        }, "");
    }

    makeItemImg(item) {
        return `<img src=" ${item.imgURL}">`;
    }

    makeItemText(item) {
        const contentTextTemp = item.contentText.reduce((acc, text) => {
            return acc + `<li>${text}</li>`;
        }, "");
        return `<div class="slide-item-text"><h2>${item.headTitle}</h2><ul>${contentTextTemp}</ul></div>`;
    }

    makeDummy(item, option) {
        const dummy = document.createElement(option.tagName);
        dummy.classList.add(option.className);
        dummy.innerHTML = item.innerHTML;
        return dummy;
    }

    placeDummy() {
        const items = taek$$(".slide-item");
        const option = { tagName: "li", className: "slide-item" }
        this.slideWrap.firstElementChild.before(this.makeDummy(items[0], option));
        this.slideWrap.lastElementChild.after(this.makeDummy(items[items.length - 1], option));
    }

    setNav() {
        this.navWrap.style.width = `${(option.cardWidth * this.data.itemContents.length) + (option.carGap * this.data.itemContents.length)}px`;
        this.navDataRender();
    }

    setSlide() {
        const dummyCount = 2;
        this.slideWrap.style.width = `${option.viewerWidth * (this.data.itemContents.length + dummyCount)}px`;
        this.slideDataRender();
        this.placeDummy();
    }
}

export default DataRender;