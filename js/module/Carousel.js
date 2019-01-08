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
    }

    displayPrevCard(){
        const prevChild = this.targetHTML.lastElementChild;
        this.targetHTML.insertAdjacentElement("afterbegin", prevChild);  
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

    slideAnimation(){
        const bSlide = this.targetHTML.classList.contains("slide");

        if(bSlide) this.targetHTML.classList.remove("slide");
        else this.targetHTML.classList.add("slide");       
    }
}

export { Carousel };