import { DATA, OPTION_DATA } from './data.js';
import { $, $$, _$ } from './util.js';

class DataAppend {
    constructor() {
        this.navWrap = $(".slide-nav");
        this.slideWrap = $(".slide-item-wrap");
    }

    navDataAppend() {
        DATA.itemContents.forEach((item, idx) => {
            const card = _$("li");
            card.innerText = item.navTitle;
            card.style.backgroundColor = OPTION_DATA.navCardColors[idx % OPTION_DATA.navCardColors.length];
            card.style.width = `${OPTION_DATA.slideOption.NAV_CARD_WIDTH}px`;
            this.navWrap.appendChild(card);
        });
    }

    slideDataAppend() {
        DATA.itemContents.forEach(item => {
            const item_box = this.makeItemBox();
            const item_img = this.makeItemImg(item);
            const item_text = this.makeItemText(item);

            item_box.appendChild(item_img);
            item_box.appendChild(item_text);
            this.slideWrap.appendChild(item_box);
            OPTION_DATA.slideOption.ITEM_COUNT++;
        });
    }

    makeItemBox() {
        const item_box = _$("li");
        item_box.classList.add("slide-item");
        return item_box;
    }

    makeItemImg(item) {
        const item_img = _$("img");
        item_img.setAttribute("src", item.imgURL);
        return item_img;
    }

    makeItemText(item) {
        const item_text_box = _$("div");
        item_text_box.classList.add("slide-item-text");

        const item_text_title = _$("h2");
        item_text_title.innerText = item.headTitle;
        item_text_box.appendChild(item_text_title);

        const item_text_ul = _$("ul");
        for (let i = 0; i < item.contentText.length; i++) {
            const item_text_li = _$("li");
            item_text_li.innerText = item.contentText[i];
            item_text_ul.appendChild(item_text_li);
        }
        item_text_box.appendChild(item_text_ul);
        return item_text_box;
    }

    makeDummy() {
        const items = $$(".slide-item");

        const firstItem = items[0];
        const lastDummy = _$("li");
        lastDummy.innerHTML = firstItem.innerHTML;
        lastDummy.classList.add("slide-item");
        this.slideWrap.lastElementChild.after(lastDummy);

        const lastItem = items[items.length - 1];
        const firstDummy = _$("li");
        firstDummy.innerHTML = lastItem.innerHTML;
        firstDummy.classList.add("slide-item");
        this.slideWrap.firstElementChild.before(firstDummy);
    }

    setNav() {
        this.navWrap.style.width = `${(OPTION_DATA.slideOption.NAV_CARD_WIDTH * DATA.itemContents.length) + (OPTION_DATA.slideOption.CARD_GAP * DATA.itemContents.length)}px`;
        this.navDataAppend();
    }

    setSlide() {
        const dummyCount = 2;
        this.slideWrap.style.width = `${OPTION_DATA.slideOption.VIEWER_WIDTH * (DATA.itemContents.length + dummyCount)}px`;
        this.slideDataAppend();
        this.makeDummy();
    }
}

export default DataAppend;