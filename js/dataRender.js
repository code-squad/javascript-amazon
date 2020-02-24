import { OPTION_DATA } from './optionData.js';
import { $, $$ } from './util.js';

class DataRender {
    constructor(dataJson) {
        this.navWrap = $(".slide-nav");
        this.slideWrap = $(".slide-item-wrap");
        this.navColors = OPTION_DATA.navCardColors;
        this.navWidth = OPTION_DATA.slideOption.NAV_CARD_WIDTH;
        this.dataJson = dataJson;
    }

    navDataAppend() {
        let navWrapInnerHTML = "";
        this.dataJson.itemContents.forEach((item, idx) => {
            const temp = `<li style="background-color: ${this.navColors[idx % this.navColors.length]}; width: ${this.navWidth}px">${item.navTitle}</li>`;
            navWrapInnerHTML += temp;
        });
        this.navWrap.innerHTML = navWrapInnerHTML;
    }

    slideDataAppend() {
        let slideWrapInnerHTML = "";
        this.dataJson.itemContents.forEach(item => {
            const temp = `<li class="slide-item">${this.makeItemImg(item)}${this.makeItemText(item)}</li>`;
            slideWrapInnerHTML += temp;
            OPTION_DATA.slideOption.ITEM_COUNT++;
        });
        this.slideWrap.innerHTML = slideWrapInnerHTML;
    }

    makeItemImg(item) {
        const temp = `<img src=" ${item.imgURL}">`;
        return temp;
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
        const lastItem = items[items.length - 1];

        const firstDummy = document.createElement("li");
        const lastDummy = document.createElement("li");

        firstDummy.classList.add("slide-item");
        lastDummy.classList.add("slide-item");

        firstDummy.innerHTML = lastItem.innerHTML;
        lastDummy.innerHTML = firstItem.innerHTML;

        this.slideWrap.firstElementChild.before(firstDummy);
        this.slideWrap.lastElementChild.after(lastDummy);
    }

    setNav() {
        this.navWrap.style.width = `${(OPTION_DATA.slideOption.NAV_CARD_WIDTH * this.dataJson.itemContents.length) + (OPTION_DATA.slideOption.CARD_GAP * this.dataJson.itemContents.length)}px`;
        this.navDataAppend();
    }

    setSlide() {
        const dummyCount = 2;
        this.slideWrap.style.width = `${OPTION_DATA.slideOption.VIEWER_WIDTH * (this.dataJson.itemContents.length + dummyCount)}px`;
        this.slideDataAppend();
        this.makeDummy();
    }
}

export default DataRender;