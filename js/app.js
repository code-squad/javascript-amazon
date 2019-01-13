import { StickyLayer } from "./module/StickyLayer.js"
import { Carousel } from "./module/Carousel.js";

const stickyLayer = new StickyLayer({ stickyEl: document.querySelector(".nav-plan-layer") });
const videoCarousel = new Carousel({
    targetHTML: document.querySelector(".video-carousel"), 
    intervalTime: 3000,
    delayTime: 5000
});
const musicCarousel = new Carousel({
    targetHTML: document.querySelector(".music-carousel"), 
    intervalTime: 3000,
    delayTime: 5000
})


window.addEventListener("load", () => {
    stickyLayer.run();
    videoCarousel.run();
    musicCarousel.run();
});