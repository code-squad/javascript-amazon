// prettier-ignore
/*eslint-disable */
import initCarousel from './src/js/initiator.js'
import carouselTemplate from './src/component/carousel.js';
import renderHTML from './src/js/render.js';
window.addEventListener('DOMContentLoaded', () => {
  renderHTML({
    currentVersion: 1,
    url: './data.json',
    templateFunc: carouselTemplate
  }).then(_ => {
    initCarousel();
  });
});
