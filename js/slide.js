import { OPTION_DATA } from './optionData.js';
import { $ } from './util.js';

class Slide {
    constructor(addOn) {
        this.slideWrap = $(".slide-item-wrap");
        this.maxItemIndex = OPTION_DATA.slideOption.ITEM_COUNT - 1;
        this.viewerWidth = OPTION_DATA.slideOption.VIEWER_WIDTH;
        this.slideSpeed = OPTION_DATA.slideOption.SLIDE_SPEED;
        this.autoSlideTime = OPTION_DATA.slideOption.AUTO_SLIDE_INTERVAL;
        this.addOnList = addOn;
        this.isSliding = false;
        this.init();
    }

    init() {
        this.moveSlideWrap(OPTION_DATA.slideOption.CUR_ITEM);
        OPTION_DATA.slideOption.AUTO_SLIDE = setTimeout(() => { this.buttonClickHandler(true) }, this.autoSlideTime);
    }

    buttonClickHandler(isNextBtn) {
        clearTimeout(OPTION_DATA.slideOption.AUTO_SLIDE);
        if (this.isSliding) return;
        this.slideAnimOn();
        if ((OPTION_DATA.slideOption.CUR_ITEM === this.maxItemIndex && isNextBtn) || (OPTION_DATA.slideOption.CUR_ITEM === 0 && !isNextBtn)) {
            OPTION_DATA.slideOption.CUR_ITEM = isNextBtn ? 0 : this.maxItemIndex;
            this.addOnList.forEach(obj => obj.run({ curItem: isNextBtn ? OPTION_DATA.slideOption.CUR_ITEM : this.maxItemIndex, prevItem: isNextBtn ? this.maxItemIndex : 0 }));
            this.moveSlideWrap(isNextBtn ? this.maxItemIndex + 1 : -1);
        } else {
            isNextBtn ? OPTION_DATA.slideOption.CUR_ITEM++ : OPTION_DATA.slideOption.CUR_ITEM--;
            this.addOnList.forEach(obj => obj.run({ curItem: OPTION_DATA.slideOption.CUR_ITEM, prevItem: isNextBtn ? OPTION_DATA.slideOption.CUR_ITEM - 1 : OPTION_DATA.slideOption.CUR_ITEM + 1 }));
            this.moveSlideWrap(OPTION_DATA.slideOption.CUR_ITEM);
        }
    }

    slideAnimEndHandler() {
        this.slideWrap.style.transition = "none";
        this.isSliding = false;
        this.moveSlideWrap(OPTION_DATA.slideOption.CUR_ITEM);
        OPTION_DATA.slideOption.AUTO_SLIDE = setTimeout(() => { this.buttonClickHandler(true) }, this.autoSlideTime);
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

export default Slide;