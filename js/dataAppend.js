import { DATA, OPTION_DATA } from './data.js';
import { $, _$ } from './util.js';

class DataAppend {
    constructor() {
        this.navContainer = $(".slide-nav");
        this.slideContainer = $(".slide-item-wrap");
    }

    navDataAppend() {
        DATA.itemContents.forEach((item, idx) => {
            const li = _$("li");
            if (idx === OPTION_DATA.slideOption.CUR_ITEM_INDEX) { li.classList.add("slide-nav-selected") }
            li.innerText = item.navTitle;
            li.style.backgroundColor = OPTION_DATA.navCardColors[idx % OPTION_DATA.navCardColors.length];
            this.navContainer.appendChild(li);
        });
    }

    slideDataAppend() {
        DATA.itemContents.forEach(item => {
            const item_box = this.makeItemBox();
            const item_img = this.makeItemImg(item);
            const item_text_box = this.makeItemTextBox(item);

            item_box.appendChild(item_img);
            item_box.appendChild(item_text_box);
            this.slideContainer.appendChild(item_box);
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

    makeItemTextBox(item) {
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

    setNav() {
        this.navContainer.style.width = `${(OPTION_DATA.slideOption.NAV_CARD_WIDTH * DATA.itemContents.length) + (OPTION_DATA.slideOption.CARD_GAP * DATA.itemContents.length)}px`;
        this.navDataAppend();
    }

    setSlide() {
        this.slideContainer.style.width = `${OPTION_DATA.slideOption.VIEWER_WIDTH * DATA.itemContents.length}px`;
        this.slideDataAppend();
    }
}

export default DataAppend;