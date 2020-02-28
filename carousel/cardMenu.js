import { _$ } from '/util.js';

export class CarouselCardMenu {
    constructor({ carouselSlider, cardMenuInfo }) {
        this.slider = carouselSlider;
        this.selector = cardMenuInfo.selector;
        this.cards = _$(this.selector.CARD, true);
    }

    setCardBtns() {
        const cardBtns = _$(this.selector.CARD_BTN, true);

        this.setCardBtnIndex();
        cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.slider.slideIndex = index + 1;
                this.addScaleEffect(btn);
                this.slider.addTransition();
            })
        })
    }

    setCardBtnIndex() {
        const FIRST_INDEX = 0
        const lastCardIndex = this.cards.length - 1;

        this.cardIndices = [];

        this.slider.slideItems.forEach((_, index) => {
            if (index === FIRST_INDEX) this.cardIndices[index] = lastCardIndex;
            else if (index === this.slider.lastSlideIndex) this.cardIndices[index] = FIRST_INDEX;
            else this.cardIndices[index] = index - 1;
        })
    }

    addScaleEffect() {
        const selected = _$(`.${this.selector.SELECTED}`),
            selectedCardIndex = this.cardIndices[this.slider.slideIndex];

        selected.classList.remove(this.selector.SELECTED);
        this.cards[selectedCardIndex].classList.add(this.selector.SELECTED);
    }
}