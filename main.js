import PlansUI from './layer.js';
import Carousel from './carousel.js';

const plansUI = new PlansUI();
const carousel = new Carousel(180);

document.addEventListener('DOMContentLoaded', () => {
    plansUI.init();
    carousel.init();
});
