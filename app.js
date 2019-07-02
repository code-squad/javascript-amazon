import config from './src/js/config.js';
import Carousel from './src/js/carousel.js'
import Viewer from './src/js/viewer.js';

const viewer = new Viewer(config);
const getData = async () => 
  await fetch('./src/js/localData.json').then(data => data.json());

window.addEventListener('DOMContentLoaded', () => {
  const localData = getData();

    localData
      .then(json => viewer.rendering(json))
      .then( () => {
        const carousel = new Carousel(config);
        carousel.init();
      });
});