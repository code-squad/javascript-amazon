import { $ } from '/util.js';

export class CarouselCardMenu {
    constructor({ carouselSlider, cardMenuInfo }) {
        this.slider = carouselSlider;
        this.selectorName = cardMenuInfo.selectorName;
        this.cards = $(this.selectorName.CARD, true);
    }

    setCardBtns() {
        const cardBtns = $(this.selectorName.CARD_BTN, true);

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
        const FIRST_INDEX = 0,
            lastCardIndex = this.cards.length - 1;

        this.cardIndices = [];

        this.slider.slideItems.forEach((_, index) => {
            if (index === FIRST_INDEX) this.cardIndices[index] = lastCardIndex;
            else if (index === this.slider.lastSlideIndex) this.cardIndices[index] = FIRST_INDEX;
            else this.cardIndices[index] = index - 1;
        })
    }

    addScaleEffect() {
        const selected = $(`.${this.selectorName.SELECTED}`),
            selectedCardIndex = this.cardIndices[this.slider.slideIndex];

        selected.classList.remove(this.selectorName.SELECTED);
        this.cards[selectedCardIndex].classList.add(this.selectorName.SELECTED);
    }
}