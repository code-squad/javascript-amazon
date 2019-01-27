import { $, debounce } from "../util.js"

class Carousel {
    constructor({ bindTo, intervalTime, delayTime }){
        this.targetEl = $(bindTo);
        this.intervalTime = intervalTime;
        this.delayTime = delayTime;
        this.playID;
    }

    run(){
        const prevBtn = $(".carousel-left-arrow", this.targetEl);
        const nextBtn = $(".carousel-right-arrow", this.targetEl);

        prevBtn.addEventListener("click", () => {
            this.displayPrevCard();
            this.delayAutoPlay();
        });

        nextBtn.addEventListener("click", () => {
            this.displayNextCard();
            this.delayAutoPlay();
        });

        this.autoPlay(this.intervalTime);
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
        this.playID = setTimeout(this.autoPlay.bind(this), this.intervalTime);
    }

    delayAutoPlay(){
        clearTimeout(this.playID);
        
        if(!this.delayCarousel) {
            this.delayCarousel = debounce(this.autoPlay.bind(this), this.delayTime);
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