import { $, debounce } from "../util.js"

class Carousel {
    constructor(bindTo, option){
        this.targetEl = $(bindTo);
        this.option = option
        this.playID;
    }

    run(){
        const prevBtn = $(this.option.leftBtn);
        const nextBtn = $(this.option.rightBtn);

        prevBtn.addEventListener("click", () => {
            this.displayPrevCard();
            this.delayAutoPlay();
        });

        nextBtn.addEventListener("click", () => {
            this.displayNextCard();
            this.delayAutoPlay();
        });

        this.autoPlay(this.option.intervalTime);
    }

    displayNextCard(){
        const displayEl = $(".carousel-wrapper", this.targetEl);

        displayEl.classList.add("slideRightOn");
        displayEl.removeEventListener("transitionend", this.slideLeftAnimationEvent);
        displayEl.addEventListener("transitionend", this.slideRightAnimationEvent);
    }

    displayPrevCard(){
        const displayEl = $(".carousel-wrapper", this.targetEl);

        displayEl.classList.add("slideLeftOn");
        displayEl.removeEventListener("transitionend", this.slideRightAnimationEvent);
        displayEl.addEventListener("transitionend", this.slideLeftAnimationEvent);
    }

    autoPlay(){
        this.displayNextCard();
        this.playID = setTimeout(this.autoPlay.bind(this), this.option.intervalTime);
    }

    delayAutoPlay(){
        clearTimeout(this.playID);
    
        if(!this.delayCarousel) {
            this.delayCarousel = debounce(this.autoPlay.bind(this), this.option.delayTime);
        }

        this.delayCarousel();
    }

    slideRightAnimationEvent(){
        const firstChild = this.firstElementChild;
                    
        this.insertBefore(firstChild, null);
        this.classList.remove("slideRightOn");
    }

    slideLeftAnimationEvent(){
        const prevChild = this.lastElementChild;

        this.insertAdjacentElement("afterbegin", prevChild);
        this.classList.remove("slideLeftOn");
    }
}

export { Carousel };