import { $, debounce, network } from "../util.js"
import { appendCarouselHTML } from "./template.js";
import { URL } from "../config.js";

class Carousel {
    constructor(bindTo, option){
        this.targetEl = $(bindTo);
        this.option = option;
        this.init();
    }

    async init() {
        const json = await network.get(`${URL.SERVER}json${this.option.ajaxUrl}`);
        appendCarouselHTML(this.targetEl, json);
        this.run();
    }

    run() {
        const prevBtn = $(this.option.leftBtn);
        const nextBtn = $(this.option.rightBtn);
        
        window.addEventListener("load", this.autoPlay.bind(this));

        prevBtn.addEventListener("click", () => {
            this.displayPrevCard();
            this.delayAutoPlay();
        });

        nextBtn.addEventListener("click", () => {
            this.displayNextCard();
            this.delayAutoPlay();
        });
    }

    displayNextCard(){
        const displayEl = $("ul.carousel-wrapper", this.targetEl);
        
        displayEl.removeEventListener("transitionend", this.slideLeftAnimationEvent);
        displayEl.addEventListener("transitionend", this.slideRightAnimationEvent);
        displayEl.classList.add("slideRightOn");
    }

    displayPrevCard(){
        const displayEl = $(".carousel-wrapper", this.targetEl);

        displayEl.removeEventListener("transitionend", this.slideRightAnimationEvent);
        displayEl.addEventListener("transitionend", this.slideLeftAnimationEvent);
        displayEl.classList.add("slideLeftOn");
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