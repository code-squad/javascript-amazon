import { OPTION_DATA } from './data.js';
import { $, $$, _$ } from './util.js';

let curItem;
let autoSlide;

class Slide {
    constructor(option, obj) {
        this.slideWrap = $(".slide-item-wrap");
        this.maxItemIndex = option.ITEM_COUNT - 1;
        this.viewerWidth = option.VIEWER_WIDTH;
        this.slideSpeed = option.SLIDE_SPEED;
        this.autoSlideTime = option.AUTO_SLIDE_INTERVAL;
        this.objList = obj;
        this.isSliding = false;
        this.init();
    }

    init() {
        curItem = OPTION_DATA.slideOption.FIRST_ITEM_INDEX;
        this.moveSlideWrap(curItem);
        autoSlide = setTimeout(() => { this.buttonClickHandler(true) }, this.autoSlideTime);
    }

    buttonClickHandler(isNextBtn) {
        clearTimeout(autoSlide);
        if (this.isSliding) return;
        this.slideAnimOn();
        if ((curItem === this.maxItemIndex && isNextBtn) || (curItem === 0 && !isNextBtn)) {
            curItem = isNextBtn ? 0 : this.maxItemIndex;
            this.objList.forEach(obj => obj.run({ curItem: isNextBtn ? curItem : this.maxItemIndex, prevItem: isNextBtn ? this.maxItemIndex : 0 }));
            this.moveSlideWrap(isNextBtn ? this.maxItemIndex + 1 : -1);
        } else {
            isNextBtn ? curItem++ : curItem--;
            this.objList.forEach(obj => obj.run({ curItem: curItem, prevItem: isNextBtn ? curItem - 1 : curItem + 1 }));
            this.moveSlideWrap(curItem);
        }
    }

    slideAnimEndHandler() {
        this.slideWrap.style.transition = "none";
        this.isSliding = false;
        this.moveSlideWrap(curItem);
        autoSlide = setTimeout(() => { this.buttonClickHandler(true) }, this.autoSlideTime);
    }

    slideAnimOn() {
        this.isSliding = true;
        this.slideWrap.style.transition = `${this.slideSpeed}s`;
    }

    moveSlideWrap(curItem) {
        const x = (curItem + 1) * -this.viewerWidth;
        this.slideWrap.style.transform = `translateX(${x + "px"})`;
    }

    run() {
        this.slideWrap.addEventListener("transitionend", this.slideAnimEndHandler.bind(this));
        const prev = $(".prev-btn");
        const next = $(".next-btn");
        prev.addEventListener("click", () => this.buttonClickHandler(false));
        next.addEventListener("click", () => this.buttonClickHandler(true));
    }
}

export class NavCard {
    constructor(option) {
        this.slideWrap = $(".slide-item-wrap");
        this.cards = $$(".slide-nav li");
        this.viewerWidth = option.VIEWER_WIDTH;
        this.slideSpeed = option.SLIDE_SPEED;
        this.init();
    }

    init() {
        this.setCardNavEvent();
    }

    navScaleCtl(curItem, prevItem) {
        this.cards[curItem].classList.add("slide-nav-selected");
        this.cards[prevItem].classList.remove("slide-nav-selected");
    }

    setCardNavEvent() {
        this.cards.forEach((card, idx) => {
            if (idx === OPTION_DATA.slideOption.FIRST_ITEM_INDEX) card.classList.add("slide-nav-selected");
            card.addEventListener("click", () => {
                const cardIdx = idx;
                this.cardClickHandler(cardIdx);
            });
        });
    }

    cardClickHandler(cardIdx) {
        if (cardIdx === curItem) return;
        clearTimeout(autoSlide);
        this.slideWrap.style.transition = `${this.slideSpeed}s`;
        const prevItem = curItem;
        curItem = cardIdx;
        this.navScaleCtl(curItem, prevItem);
        const x = (curItem + 1) * -this.viewerWidth;
        this.slideWrap.style.transform = `translateX(${x + "px"})`;
    }

    run(option) {
        this.navScaleCtl(option.curItem, option.prevItem);
    }
}

export default Slide;