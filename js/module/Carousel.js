class Carousel {
    constructor({ targetHTML, prevBtn, nextBtn }){
        this.targetHTML = targetHTML;
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.playID;
        this.timer;
    }

    run(){
        this.autoPlay();

        this.prevBtn.addEventListener("click", () => {
            this.displayPrevCard();
            this.delayAutoPlay();
        });

        this.nextBtn.addEventListener("click", () => {
            this.displayNextCard();
            this.delayAutoPlay();
        });
    }

    displayNextCard(){
        this.targetHTML.classList.add("slideRightOn");
        this.targetHTML.removeEventListener("transitionend", this.slideLeftAnimationEvent);
        this.targetHTML.addEventListener("transitionend", this.slideRightAnimationEvent);
    }

    displayPrevCard(){
        this.targetHTML.classList.add("slideLeftOn");
        this.targetHTML.removeEventListener("transitionend", this.slideRightAnimationEvent);
        this.targetHTML.addEventListener("transitionend", this.slideLeftAnimationEvent);
    }

    autoPlay(){
        this.playID = setInterval(() => {
            this.displayNextCard();
        }, 3000);
    }

    delayAutoPlay(){
        clearInterval(this.playID);

        if(this.timer) clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            this.autoPlay();    
        }, 5000);
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