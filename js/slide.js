import { OPTION_DATA } from './data.js';
import { $, $$, _$ } from './util.js';

let curItem;

class Slide {
    constructor(option, obj) {
        curItem = OPTION_DATA.slideOption.FIRST_ITEM_INDEX;
        this.wrap = $(".slide-item-wrap");
        this.itemsCount = option.ITEM_COUNT;
        this.viewerWidth = option.VIEWER_WIDTH;
        this.prevHandler = this.prevHandler.bind(this);
        this.nextHandler = this.nextHandler.bind(this);
        this.objList = obj;
        this.moveWrap();
    }

    nextHandler() {
        if (curItem === this.itemsCount - 1) {
            curItem = 0;
            this.objList.forEach(obj => obj.run({ curItem: curItem, prevItem: this.itemsCount - 1 }));
            this.moveWrap();
        } else {
            curItem++;
            this.objList.forEach(obj => obj.run({ curItem: curItem, prevItem: curItem - 1 }));
            this.moveWrap();
        }
    }

    prevHandler() {
        if (curItem === 0) {
            curItem = this.itemsCount - 1;
            this.objList.forEach(obj => obj.run({ curItem: this.itemsCount - 1, prevItem: 0 }));
            this.moveWrap();
        } else {
            curItem--;
            this.objList.forEach(obj => obj.run({ curItem: curItem, prevItem: curItem + 1 }));
            this.moveWrap();
        }
    }

    moveWrap() {
        const x = curItem * -this.viewerWidth;
        this.wrap.style.transform = `translateX(${x + "px"})`;
    }

    run() {
        const prev = $(".prev-btn");
        const next = $(".next-btn");
        prev.addEventListener("click", this.prevHandler);
        next.addEventListener("click", this.nextHandler);
    }
}

export class NavCard {
    constructor(option) {
        this.wrap = $(".slide-item-wrap");
        this.cards = $$(".slide-nav li");
        this.viewerWidth = option.VIEWER_WIDTH;
        this.setCardNavEvent();
    }

    navScaleCtl(curItem, prevItem) {
        this.cards[curItem].classList.add("slide-nav-selected");
        this.cards[prevItem].classList.remove("slide-nav-selected");
    }

    setCardNavEvent() {
        this.cards.forEach((node, idx) => {
            if (idx === OPTION_DATA.slideOption.FIRST_ITEM_INDEX) { node.classList.add("slide-nav-selected") }
            node.addEventListener("click", () => {
                if (idx === curItem) return;
                const prevItem = curItem;
                curItem = idx;
                this.navScaleCtl(curItem, prevItem);
                const x = curItem * -this.viewerWidth;
                this.wrap.style.transform = `translateX(${x + "px"})`;
            });
        });
    }

    run(option) {
        this.navScaleCtl(option.curItem, option.prevItem);
    }
}

export default Slide;