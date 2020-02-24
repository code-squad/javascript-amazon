import { OPTION_DATA } from './optionData.js';
import { $, $$ } from './util.js';

class NavCard {
    constructor() {
        this.slideWrap = $(".slide-item-wrap");
        this.cards = $$(".slide-nav li");
        this.viewerWidth = OPTION_DATA.slideOption.VIEWER_WIDTH;
        this.slideSpeed = OPTION_DATA.slideOption.SLIDE_SPEED;
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
            if (idx === OPTION_DATA.slideOption.CUR_ITEM) card.classList.add("slide-nav-selected");
            card.addEventListener("click", () => {
                const cardIdx = idx;
                this.cardClickHandler(cardIdx);
            });
        });
    }

    cardClickHandler(cardIdx) {
        if (cardIdx === OPTION_DATA.slideOption.CUR_ITEM) return;
        clearTimeout(OPTION_DATA.slideOption.AUTO_SLIDE);
        this.slideWrap.style.transition = `${this.slideSpeed}s`;
        const prevItem = OPTION_DATA.slideOption.CUR_ITEM;
        OPTION_DATA.slideOption.CUR_ITEM = cardIdx;
        this.navScaleController(OPTION_DATA.slideOption.CUR_ITEM, prevItem);
        const x = (OPTION_DATA.slideOption.CUR_ITEM + 1) * -this.viewerWidth;
        this.slideWrap.style.transform = `translateX(${x + "px"})`;
    }

    run(option) {
        this.navScaleController(option.curItem, option.prevItem);
    }
}

export default NavCard;