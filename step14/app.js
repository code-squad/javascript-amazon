import config from './src/js/config.js';
import Carousel from './src/js/carousel.js';
import carouselTemplate from './src/component/carousel.js';
import makeDataToHtml from './src/js/template.js';

window.addEventListener('DOMContentLoaded', () => {
  const carouselURL = 'http://127.0.0.1:5500/data.json';
  fetch(carouselURL)
    .then(response => response.json())
    .then(data => makeDataToHtml(data, carouselTemplate))
    .then(carouselHtml => {
      const body = document.querySelector('body');
      body.insertAdjacentHTML('afterbegin', carouselHtml);
    })
    .then(() => {
      const carousel = new Carousel(config);
      carousel.init();
    });
});
