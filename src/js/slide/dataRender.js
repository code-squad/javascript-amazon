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
        let navWrapInnerHTML = "";
        this.data.itemContents.forEach((item, idx) => {
            const temp = `<li class=${idx} style="background-color: ${navColors[idx % navColors.length]}; width: ${option.cardWidth}px">${item.navTitle}</li>`;
            navWrapInnerHTML += temp;
        });
        this.navWrap.innerHTML = navWrapInnerHTML;
    }

    slideDataRender() {
        let slideWrapInnerHTML = "";
        this.data.itemContents.forEach(item => {
            const temp = `<li class="slide-item">${this.makeItemImg(item)}${this.makeItemText(item)}</li>`;
            slideWrapInnerHTML += temp;
            option.itemsCount++;
        });
        this.slideWrap.innerHTML = slideWrapInnerHTML;
    }

    makeItemImg(item) {
        return `<img src=" ${item.imgURL}">`;
    }

    makeItemText(item) {
        let contentTextTemp = "";
        for (let i = 0; i < item.contentText.length; i++) {
            const temp = `<li>${item.contentText[i]}</li>`;
            contentTextTemp += temp;
        }
        const temp = `<div class="slide-item-text"><h2>${item.headTitle}</h2><ul>${contentTextTemp}</ul></div>`;
        return temp;
    }

    makeDummy() {
        const items = taek$$(".slide-item");

        const firstItem = items[0];
        const firstDummy = document.createElement("li");
        firstDummy.classList.add("slide-item");

        const lastItem = items[items.length - 1];
        const lastDummy = document.createElement("li");
        lastDummy.classList.add("slide-item");

        firstDummy.innerHTML = lastItem.innerHTML;
        lastDummy.innerHTML = firstItem.innerHTML;

        this.slideWrap.firstElementChild.before(firstDummy);
        this.slideWrap.lastElementChild.after(lastDummy);
    }

    setNav() {
        this.navWrap.style.width = `${(option.cardWidth * this.data.itemContents.length) + (option.carGap * this.data.itemContents.length)}px`;
        this.navDataRender();
    }

    setSlide() {
        const dummyCount = 2;
        this.slideWrap.style.width = `${option.viewerWidth * (this.data.itemContents.length + dummyCount)}px`;
        this.slideDataRender();
        this.makeDummy();
    }
}

export default DataRender;