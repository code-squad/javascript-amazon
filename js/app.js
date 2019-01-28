import { StickyLayer } from "./module/StickyLayer.js"
import { Carousel } from "./module/Carousel.js";
import { Autocomplete } from "./module/Autocomplete.js"

const stickyLayer = new StickyLayer(".plan-layer");
const videoCarousel = new Carousel("#video-card", {
    intervalTime: 3000,
    delayTime: 5000,
    leftBtn: "#video-left",
    rightBtn: "#video-right"
});
const musicCarousel = new Carousel("#music-card", {
    intervalTime: 3000,
    delayTime: 5000,
    leftBtn: "#music-left",
    rightBtn: "#music-right"
});
const autocomplete = new Autocomplete(".nav-input-bar", {
    keywordsContainer: ".nav-search-autocomplete",
    bDimmer: true
});

window.addEventListener("load", () => {
    stickyLayer.run();
    videoCarousel.run();
    musicCarousel.run();
    autocomplete.run();
});