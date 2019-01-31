import { StickyLayer } from "./module/StickyLayer.js"
import { Carousel } from "./module/Carousel.js";
import { Autocomplete } from "./module/Autocomplete.js"

document.addEventListener("DOMContentLoaded", () => {
    const stickyLayer = new StickyLayer(".plan-layer");

    const videoCarousel = new Carousel(".video-carousel", {
        intervalTime: 3000,
        delayTime: 5000,
        itemUrl: "/videoCarousel.json"
    });

    const musicCarousel = new Carousel(".music-carousel", {
        intervalTime: 3000,
        delayTime: 5000,
        itemUrl: "/musicCarousel.json"
    });

    const autocomplete = new Autocomplete(".nav-input-bar", {
        keywordsContainer: ".nav-search-autocomplete",
        acTime: 500,
        bDimmer: true
    });
})