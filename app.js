import config from './src/components/carousel/helper/config.js';
import template from './src/components/carousel/helper/template.js';
import RenderTemplate from './src/components/carousel/renderTemplate.js';
import Carousel from './src/components/carousel/carousel.js'

const headerViewer = new RenderTemplate(config.header, template.getHeaderTemplate);
const mainViewer = new RenderTemplate(config.container, template.getMainTempalte);

const getCarouselData = async () => 
  await fetch('./public/json/localData.json').then(data => data.json());

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