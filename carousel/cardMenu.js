import { _$ } from '/util.js';
import { cardMenuInfo } from './config.js';

export class CarouselCardMenu {
    constructor( carouselSlider ) {
        this.slider = carouselSlider;
        this.selector = cardMenuInfo.selector;
        this.cards = _$(this.selector.card, true);
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
            const selected = _$(`.${this.selector.selected}`);
            selected.classList.remove(this.selector.selected);
        }

        this.cards[this.slider.slideIndex].classList.add(this.selector.selected);
    }

    onCardBtns() {
        const cardBtns = _$(this.selector.cardBtn, true);
        cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.slider.slideIndex = index + 1;
                this.addScaleEffect(true);
                this.slider.addTransition();
            })
        })
    }
}
