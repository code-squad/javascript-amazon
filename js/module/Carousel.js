class Carousel {
    constructor({ targetEl, intervalTime, delayTime }){
        this.targetEl = targetEl;
        this.intervalTime = intervalTime;
        this.delayTime = delayTime;
        this.playID;
        this.timer;
    }

    run(){
        const prevBtn = this.targetEl.querySelector(".carousel-left-arrow");
        const nextBtn = this.targetEl.querySelector(".carousel-right-arrow");

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
        const displayEl = this.targetEl.querySelector(".carousel-wrapper");

        displayEl.classList.add("slideRightOn");
        displayEl.removeEventListener("transitionend", this.slideLeftAnimationEvent);
        displayEl.addEventListener("transitionend", this.slideRightAnimationEvent);
    }

    displayPrevCard(){
        const displayEl = this.targetEl.querySelector(".carousel-wrapper");

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

        if(this.timer) clearTimeout(this.timer);

        this.timer = setTimeout(this.autoPlay.bind(this), this.delayTime);
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