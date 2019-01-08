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
        const firstChild = this.targetHTML.firstElementChild;
        this.targetHTML.insertBefore(firstChild, null);
        
        this.slideAnimation("right");
    }

    displayPrevCard(){
        const prevChild = this.targetHTML.lastElementChild;
        this.targetHTML.insertAdjacentElement("afterbegin", prevChild);     

        this.slideAnimation("left");
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

    slideAnimation(direction){
        if(direction === "right") {
            this.targetHTML.classList.replace("slideLeftOn", "slideRightOn");
            this.targetHTML.classList.add("slideRightOff");
            
            setTimeout(() => {
                this.targetHTML.classList.remove("slideRightOff");
            }, 0)
        }
        else if (direction === "left") {
            this.targetHTML.classList.replace("slideRightOn", "slideLeftOn");
            this.targetHTML.classList.add("slideLeftOff");
            
            setTimeout(() => {
                this.targetHTML.classList.remove("slideLeftOff");
            }, 0)
        }

    }
}

export { Carousel };