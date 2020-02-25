import options from './options.js';
import { $, $$ } from './util.js';

const { slideOption: option } = options;

class NavCard {
    constructor() {
        this.navWrap = $(".slide-nav");
        this.slideWrap = $(".slide-item-wrap");
        this.cards = $$(".slide-nav li");
        this.init();
    }

    init() {
        this.navScaleController();
        this.setNavEvent();
    }

    navScaleController(curItem = option.curItem, prevItem = 0) {
        this.cards[prevItem].classList.remove("slide-nav-selected");
        this.cards[curItem].classList.add("slide-nav-selected");
    }

    setNavEvent() {
        this.navWrap.addEventListener("click", this.navEventDelegate.bind(this));
    }

    navEventDelegate(evt) {
        const target = evt.target;
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
        this.navScaleController(option.curItem, prevItem);
        const x = (option.curItem + 1) * -option.viewerWidth;
        this.slideWrap.style.transform = `translateX(${x + "px"})`;
    }

    run(option) {
        this.navScaleController(option.curItem, option.prevItem);
    }
}

export default NavCard;