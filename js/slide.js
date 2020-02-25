import options from './options.js';
import { $ } from './util.js';

const { slideOption: option } = options;

class Slide {
    constructor(addOn) {
        this.slideWrap = $(".slide-item-wrap");
        this.maxItemIndex = option.itemsCount - 1;
        this.autoSlideTime = option.audoSlideInterval;
        this.addOnList = addOn;
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
        if ((option.curItem === this.maxItemIndex && isNextBtn) || (option.curItem === 0 && !isNextBtn)) {
            option.curItem = isNextBtn ? 0 : this.maxItemIndex;
            this.addOnList.forEach(obj => obj.run({ curItem: isNextBtn ? option.curItem : this.maxItemIndex, prevItem: isNextBtn ? this.maxItemIndex : 0 }));
            this.moveSlideWrap(isNextBtn ? this.maxItemIndex + 1 : -1);
        } else {
            isNextBtn ? option.curItem++ : option.curItem--;
            this.addOnList.forEach(obj => obj.run({ curItem: option.curItem, prevItem: isNextBtn ? option.curItem - 1 : option.curItem + 1 }));
            this.moveSlideWrap(option.curItem);
        }
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
        const prev = $(".prev-btn");
        const next = $(".next-btn");
        prev.addEventListener("click", () => this.buttonClickHandler(false));
        next.addEventListener("click", () => this.buttonClickHandler(true));
    }
}

export default Slide;