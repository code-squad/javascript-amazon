import PlansUI from './layer.js';
import Carousel from './carousel.js';

const carouselSetting = {
    carouselSelector: {
        carousel: ".carousel",
        container: ".carousel-container"
    },
    btnSelector: {
        prevBtn: ".prev-btn",
        nextBtn: ".next-btn"
    },
    options: {
        itemWidth: 180,
        carouselDuration: 2000,
        carouselCheckingDuration: 500,
        timeGapToRestartCarousel: 5000,
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const plansUI = new PlansUI();
    const carousel = new Carousel(carouselSetting);

    plansUI.init();
    carousel.init();
});
