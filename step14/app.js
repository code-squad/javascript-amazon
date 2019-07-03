// prettier-ignore
/*eslint-disable */

import config from './src/js/config.js';
import Carousel from './src/js/carousel.js';
import carouselTemplate from './src/component/carousel.js';
import makeDataToHtml from './src/js/template.js';

window.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const getData = async () =>
    await fetch('http://127.0.0.1:5500/data.json').then(response =>
      response.json(),
    );
  const currentVersion = 1;
  const version = localStorage.getItem('version');
  let data = localStorage.getItem('data');
  if (!version || version < currentVersion) {
    getData().then(carouselData => {
      localStorage.setItem('data', JSON.stringify(carouselData));
      localStorage.setItem('version', currentVersion);
      body.insertAdjacentHTML(
        'afterbegin',
        makeDataToHtml(carouselData, carouselTemplate),
      );
      const carousel = new Carousel(config);
      carousel.init();
    });
  } else {
    body.insertAdjacentHTML(
      'afterbegin',
      makeDataToHtml(JSON.parse(data), carouselTemplate),
    );
    const carousel = new Carousel(config);
    carousel.init();
  }
});
