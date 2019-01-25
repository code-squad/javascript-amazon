import { $ } from "./util.js";
import { StickyLayer } from "./module/StickyLayer.js"
import { Carousel } from "./module/Carousel.js";
import { Autocomplete } from "./module/Autocomplete.js"

const stickyLayer = new StickyLayer({ stickyEl: $(".plan-layer") });
const videoCarousel = new Carousel({
    targetEl: $(".video-carousel"), 
    intervalTime: 3000,
    delayTime: 5000
});
const musicCarousel = new Carousel({
    targetEl: $(".music-carousel"), 
    intervalTime: 3000,
    delayTime: 5000
});
const autocomplete = new Autocomplete({
    searchEl: $(".nav-input-bar")
})

window.addEventListener("load", () => {
    stickyLayer.run();
    videoCarousel.run();
    musicCarousel.run();
    autocomplete.sendReq();
});