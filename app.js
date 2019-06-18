import config from './src/js/config.js';
import Carousel from './src/js/carousel.js'

window.addEventListener('DOMContentLoaded', () => {
  const carousel = new Carousel(config);
  carousel.init();
})