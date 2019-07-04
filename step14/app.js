// prettier-ignore
/*eslint-disable */

import config from './src/js/config.js';
import Carousel from './src/js/carousel.js';
import carouselTemplate from './src/component/carousel.js';
import renderHTML from './src/js/render.js';

window.addEventListener('DOMContentLoaded', () => {
  renderHTML({
    currentVersion: 1,
    url: 'http://127.0.0.1:5500/data.json',
    templateFunc: carouselTemplate,
  }).then(_ => {
    const carousel = new Carousel(config);
    carousel.init();
  });
});
