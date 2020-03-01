import { _$ } from '/util.js';

export class CarouselCardMenu {
    constructor({ carouselSlider, cardMenuInfo }) {
        this.slider = carouselSlider;
        this.selector = cardMenuInfo.selector;
        this.cards = _$(this.selector.CARD, true);
    }

    setCardBtns() {
        this.pushClonedSlideCard();
        this.addScaleEffect();
        this.onCardBtns();
    }

    pushClonedSlideCard() {
        const firstCardIndex = 0;
        const lastCardIndex = this.cards.length - 1;

        this.cards = Array.from(this.cards);
        this.cards.push(this.cards[firstCardIndex]);
        this.cards.unshift(this.cards[lastCardIndex]);
    }

    addScaleEffect(removal) {
        if (removal) {
            const selected = _$(`.${this.selector.SELECTED}`);
            selected.classList.remove(this.selector.SELECTED);
        }

        this.cards[this.slider.slideIndex].classList.add(this.selector.SELECTED);
    }

    onCardBtns() {
        const cardBtns = _$(this.selector.CARD_BTN, true);
        cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.slider.slideIndex = index + 1;
                this.addScaleEffect(true);
                this.slider.addTransition();
            })
        })
    }
}
