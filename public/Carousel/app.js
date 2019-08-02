// prettier-ignore
/*eslint-disable */
import initCarousel from './src/js/initiator.js'
import carouselTemplate from './src/component/carouselTpl.js';
import renderHTML from '../PLib/render.js';
window.addEventListener('DOMContentLoaded', () => {
  renderHTML({
    currentVersion: 1,
    url: '/tpl-src-data.json',
    templateFunc: carouselTemplate
  }).then(_ => {
    initCarousel();
  });
});
