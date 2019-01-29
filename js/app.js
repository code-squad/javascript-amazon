import { StickyLayer } from "./module/StickyLayer.js"
import { Carousel } from "./module/Carousel.js";
import { Autocomplete } from "./module/Autocomplete.js"

const stickyLayer = new StickyLayer(".plan-layer");
const autocomplete = new Autocomplete(".nav-input-bar", {
    keywordsContainer: ".nav-search-autocomplete",
    acTime: 500,
    bDimmer: true
});
const videoCarousel = new Carousel("#video-card", {
    intervalTime: 3000,
    delayTime: 5000,
    leftBtn: "#video-left",
    rightBtn: "#video-right",
    ajaxUrl: "/videoCarousel.json"
});
const musicCarousel = new Carousel("#music-card", {
    intervalTime: 3000,
    delayTime: 5000,
    leftBtn: "#music-left",
    rightBtn: "#music-right",
    ajaxUrl: "/musicCarousel.json"
});