import { StickyLayer } from "./module/StickyLayer.js"
import { Carousel } from "./module/Carousel.js";

const stickyLayer = new StickyLayer({ stickyEl: document.querySelector(".nav-plan-layer") });
const videoCarousel = new Carousel({
    targetHTML: document.querySelector(".video-carousel .carousel-wrapper"), 
    prevBtn: document.querySelector(".video-carousel .carousel-left-arrow"), 
    nextBtn: document.querySelector(".video-carousel .carousel-right-arrow"), 
});
const musicCarousel = new Carousel({
    targetHTML: document.querySelector(".music-carousel .carousel-wrapper"), 
    prevBtn: document.querySelector(".music-carousel .carousel-left-arrow"), 
    nextBtn: document.querySelector(".music-carousel .carousel-right-arrow"), 
})


window.addEventListener("load", () => {
    stickyLayer.run();
    videoCarousel.run();
    musicCarousel.run();
});

