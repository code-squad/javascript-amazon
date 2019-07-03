import config from './src/js/helper/config.js';
import template from './src/js/helper/template.js';
import Viewer from './src/js/viewer.js';
import Carousel from './src/js/carousel.js'

const headerViewer = new Viewer(config.header, template.getHeaderTemplate);
const mainViewer = new Viewer(config.container, template.getMainTempalte);

const getData = async () => 
  await fetch('./src/JSON/localData.json').then(data => data.json());

window.addEventListener('DOMContentLoaded', () => {
  const localData = getData();

    localData
      .then(json => {
        headerViewer.rendering(json.header);
        return json;
      })
      .then(json => mainViewer.rendering(json.main))
      .then( () => {
        const carousel = new Carousel(config);
        carousel.init();
      });
});