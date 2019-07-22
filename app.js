import config from './src/js/carousel/helper/config.js';
import template from './src/js/carousel/helper/template.js';
import RenderTemplate from './src/js/carousel/renderTemplate.js';
import Carousel from './src/js/carousel/carousel.js'

const headerViewer = new RenderTemplate(config.header, template.getHeaderTemplate);
const mainViewer = new RenderTemplate(config.container, template.getMainTempalte);

const getCarouselData = async () => 
  await fetch('./src/JSON/localData.json').then(data => data.json());

window.addEventListener('DOMContentLoaded', () => {
  const localData = getCarouselData();

  localData
    .then(json => {
      headerViewer.rendering(json.header);
      mainViewer.rendering(json.main);
      return json;
    })
    .then( () => {
      const carousel = new Carousel(config);
      carousel.init();
    });
});