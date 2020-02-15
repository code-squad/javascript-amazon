import { OPTION_DATA } from './data.js';
import { $, $$, _$ } from './util.js';

let curItem;

class Slide {
    constructor(option, obj) {
        this.wrap = $(".slide-item-wrap");
        this.maxItemIndex = option.ITEM_COUNT - 1;
        this.viewerWidth = option.VIEWER_WIDTH;
        this.slideSpeed = option.SLIDE_SPEED;
        this.objList = obj;
        this.isSliding = false;
        this.init();
    }

    init() {
        curItem = OPTION_DATA.slideOption.FIRST_ITEM_INDEX;
        this.moveWrap(curItem);
    }

    nextHandler() {
        if (this.isSliding) return;
        this.slideAnimOn();
        if (curItem === this.maxItemIndex) {
            curItem = 0;
            this.objList.forEach(obj => obj.run({ curItem: curItem, prevItem: this.maxItemIndex }));
            this.moveWrap(this.maxItemIndex + 1);
        } else {
            curItem++;
            this.objList.forEach(obj => obj.run({ curItem: curItem, prevItem: curItem - 1 }));
            this.moveWrap(curItem);
        }
    }

    prevHandler() {
        if (this.isSliding) return;
        this.slideAnimOn();
        if (curItem === 0) {
            curItem = this.maxItemIndex;
            this.objList.forEach(obj => obj.run({ curItem: this.maxItemIndex, prevItem: 0 }));
            this.moveWrap(-1);
        } else {
            curItem--;
            this.objList.forEach(obj => obj.run({ curItem: curItem, prevItem: curItem + 1 }));
            this.moveWrap(curItem);
        }
    }

    slideAnimEndHandler() {
        this.wrap.style.transition = "none";
        this.isSliding = false;
        this.moveWrap(curItem);
    }

    slideAnimOn() {
        this.isSliding = true;
        this.wrap.style.transition = `${this.slideSpeed}s`;
    }

    moveWrap(curItem) {
        const x = (curItem + 1) * -this.viewerWidth;
        this.wrap.style.transform = `translateX(${x + "px"})`;
    }

    run() {
        this.wrap.addEventListener("transitionend", this.slideAnimEndHandler.bind(this));
        const prev = $(".prev-btn");
        const next = $(".next-btn");
        prev.addEventListener("click", this.prevHandler.bind(this));
        next.addEventListener("click", this.nextHandler.bind(this));
    }
}

export class NavCard {
    constructor(option) {
        this.wrap = $(".slide-item-wrap");
        this.cards = $$(".slide-nav li");
        this.viewerWidth = option.VIEWER_WIDTH;
        this.slideSpeed = option.SLIDE_SPEED;
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
                this.wrap.style.transition = `${this.slideSpeed}s`;
                const prevItem = curItem;
                curItem = idx;
                this.navScaleCtl(curItem, prevItem);
                const x = (curItem + 1) * -this.viewerWidth;
                this.wrap.style.transform = `translateX(${x + "px"})`;
            });
        });
    }

    run(option) {
        this.navScaleCtl(option.curItem, option.prevItem);
    }
}

export default Slide;