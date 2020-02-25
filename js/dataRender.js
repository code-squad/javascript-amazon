import options from './options.js';
import { $, $$ } from './util.js';

const { slideOption: option } = options;

class DataRender {
    constructor(dataJson) {
        this.navWrap = $(".slide-nav");
        this.slideWrap = $(".slide-item-wrap");
        this.dataJson = dataJson;
    }

    navDataRender() {
        const navColors = options.navCardColors;
        let navWrapInnerHTML = "";
        this.dataJson.itemContents.forEach((item, idx) => {
            const temp = `<li style="background-color: ${navColors[idx % navColors.length]}; width: ${option.cardWidth}px">${item.navTitle}</li>`;
            navWrapInnerHTML += temp;
        });
        this.navWrap.innerHTML = navWrapInnerHTML;
    }

    slideDataRender() {
        let slideWrapInnerHTML = "";
        this.dataJson.itemContents.forEach(item => {
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
        const items = $$(".slide-item");

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
        this.navWrap.style.width = `${(option.cardWidth * this.dataJson.itemContents.length) + (option.carGap * this.dataJson.itemContents.length)}px`;
        this.navDataRender();
    }

    setSlide() {
        const dummyCount = 2;
        this.slideWrap.style.width = `${option.viewerWidth * (this.dataJson.itemContents.length + dummyCount)}px`;
        this.slideDataRender();
        this.makeDummy();
    }
}

export default DataRender;