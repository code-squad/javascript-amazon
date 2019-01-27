import { $ } from "./util.js";
import { StickyLayer } from "./module/StickyLayer.js"
import { Carousel } from "./module/Carousel.js";
import { Autocomplete } from "./module/Autocomplete.js"

const stickyLayer = new StickyLayer(".plan-layer");
const videoCarousel = new Carousel({
    bindTo: ".video-carousel", 
    intervalTime: 3000,
    delayTime: 5000
});
const musicCarousel = new Carousel({
    bindTo: ".music-carousel", 
    intervalTime: 3000,
    delayTime: 5000
});
const autocomplete = new Autocomplete(".nav-input-bar");

window.addEventListener("load", () => {
    stickyLayer.run();
    videoCarousel.run();
    musicCarousel.run();
    autocomplete.run();
});