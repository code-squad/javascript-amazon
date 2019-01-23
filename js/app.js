import { StickyLayer } from "./module/StickyLayer.js"
import { Carousel } from "./module/Carousel.js";

const stickyLayer = new StickyLayer({ stickyEl: document.querySelector(".plan-layer") });
const videoCarousel = new Carousel({
    targetEl: document.querySelector(".video-carousel"), 
    intervalTime: 3000,
    delayTime: 5000
});
const musicCarousel = new Carousel({
    targetEl: document.querySelector(".music-carousel"), 
    intervalTime: 3000,
    delayTime: 5000
});

window.addEventListener("DOMContentLoaded", () => {
    stickyLayer.run();
    videoCarousel.run();
    musicCarousel.run();
});