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
        this.setCardNavEvent();
    }

    navScaleController(curItem, prevItem) {
        this.cards[curItem].classList.add("slide-nav-selected");
        this.cards[prevItem].classList.remove("slide-nav-selected");
    }

    setCardNavEvent() {
        this.cards.forEach((card, idx) => {
            if (idx === option.curItem) card.classList.add("slide-nav-selected");
            card.addEventListener("click", () => {
                const cardIdx = idx;
                this.cardClickHandler(cardIdx);
            });
        });
    }

    // setCardNavEvent() {
    //     this.navWrap.addEventListener("click", function (evt) {
    //         console.log(evt.target);
    //     })
    // }


    cardClickHandler(cardIdx) {
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