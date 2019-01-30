import { $, debounce, network } from "../util.js"
import { createCarouselTemplate, appendTemplate } from "./template.js";
import { URL } from "../config.js";

class Carousel {
    constructor(bindTo, option){
        this.targetEl = $(bindTo);
        this.carouselItems = $(".carousel-items", this.targetEl);
        this.option = option;
        this.init();
    }

    init() {
        const prevBtn = $(".carousel-left-arrow", this.targetEl);
        const nextBtn = $(".carousel-right-arrow", this.targetEl);
        
        this.addCarouselDOM();

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

    async addCarouselDOM() {
        const jsonData = await network.get(`${URL.SERVER}json${this.option.itemUrl}`);
        const carouselTemplate = createCarouselTemplate(jsonData);

        appendTemplate(this.carouselItems, carouselTemplate);
    }

    displayNextCard(){
        this.carouselItems.removeEventListener("transitionend", this.slideLeftAnimationEvent);
        this.carouselItems.addEventListener("transitionend", this.slideRightAnimationEvent);
        this.carouselItems.classList.add("slideRightOn");
    }

    displayPrevCard(){
        this.carouselItems.removeEventListener("transitionend", this.slideRightAnimationEvent);
        this.carouselItems.addEventListener("transitionend", this.slideLeftAnimationEvent);
        this.carouselItems.classList.add("slideLeftOn");
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