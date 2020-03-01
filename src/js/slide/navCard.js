import options from './options.js';
import { taek$, taek$$ } from '../lib/util.js';

const { slideOption: option } = options;

class NavCard {
    constructor() {
        this.navWrap = taek$(".slide-nav");
        this.slideWrap = taek$(".slide-item-wrap");
        this.cards = taek$$(".slide-nav li");
        this.init();
    }

    init() {
        this.setNavEvent();
    }

    navScaleControl(curItem = option.curItem, prevItem = 0) {
        this.cards[prevItem].classList.remove("slide-nav-selected");
        this.cards[curItem].classList.add("slide-nav-selected");
    }

    setNavEvent() {
        this.navWrap.addEventListener("click", this.navEventDelegate.bind(this));
    }

    navEventDelegate({ target }) {
        if (target.tagName === "LI") {
            const navIndex = parseInt(target.classList[0]);
            this.navClickHandler(navIndex);
        }
    }

    navClickHandler(cardIdx) {
        if (cardIdx === option.curItem) return;
        clearTimeout(option.autoSlide);
        this.slideWrap.style.transition = `${option.slideSpeed}s`;
        const prevItem = option.curItem;
        option.curItem = cardIdx;
        this.navScaleControl(option.curItem, prevItem);
        const x = (option.curItem + 1) * -option.viewerWidth;
        this.slideWrap.style.transform = `translateX(${x + "px"})`;
    }

    run({ curItem, prevItem }) {
        this.navScaleControl(curItem, prevItem);
    }
}

export default NavCard;