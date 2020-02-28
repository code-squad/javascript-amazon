import options from './options.js';
import { taek$ } from '../lib/util.js';

const { slideOption: option } = options;

class Slide {
    constructor(navCard) {
        this.slideWrap = taek$(".slide-item-wrap");
        this.maxItemIndex = option.itemsCount - 1;
        this.autoSlideTime = option.autoSlideInterval;
        this.navCard = navCard;
        this.isSliding = false;
        this.init();
    }

    init() {
        this.moveSlideWrap(option.curItem);
        option.autoSlide = setTimeout(() => { this.buttonClickHandler(true) }, this.autoSlideTime);
    }

    buttonClickHandler(isNextBtn) {
        clearTimeout(option.autoSlide);
        if (this.isSliding) return;
        this.slideAnimOn();
        if (this.itemPositionCheck(option.curItem, isNextBtn)) {
            option.curItem = isNextBtn ? 0 : this.maxItemIndex;
            this.navCard.run({ curItem: isNextBtn ? option.curItem : this.maxItemIndex, prevItem: isNextBtn ? this.maxItemIndex : 0 });
            this.moveSlideWrap(isNextBtn ? this.maxItemIndex + 1 : -1);
        } else {
            isNextBtn ? option.curItem++ : option.curItem--;
            this.navCard.run({ curItem: option.curItem, prevItem: isNextBtn ? option.curItem - 1 : option.curItem + 1 });
            this.moveSlideWrap(option.curItem);
        }
    }

    itemPositionCheck(curItem, isNextBtn) {
        if ((curItem === this.maxItemIndex && isNextBtn) || (curItem === 0 && !isNextBtn)) {
            return true;
        }
        return false;
    }

    slideAnimEndHandler() {
        this.slideWrap.style.transition = "none";
        this.isSliding = false;
        this.moveSlideWrap(option.curItem);
        option.autoSlide = setTimeout(() => { this.buttonClickHandler(true) }, this.autoSlideTime);
    }

    slideAnimOn() {
        this.isSliding = true;
        this.slideWrap.style.transition = `${option.slideSpeed}s`;
    }

    moveSlideWrap(curItem) {
        const x = (curItem + 1) * -option.viewerWidth;
        this.slideWrap.style.transform = `translateX(${x + "px"})`;
    }

    run() {
        this.slideWrap.addEventListener("transitionend", this.slideAnimEndHandler.bind(this));
        const prev = taek$(".prev-btn");
        const next = taek$(".next-btn");
        prev.addEventListener("click", () => this.buttonClickHandler(false));
        next.addEventListener("click", () => this.buttonClickHandler(true));
    }
}

export default Slide;