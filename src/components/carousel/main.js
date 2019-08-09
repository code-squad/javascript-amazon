import cf from './helper/config.js';
import RenderTemplate from './renderTemplate.js';
import Carousel from './carousel.js';
import { getHeaderTemplate, getMainTemplate } from './helper/template.js';

const headerViewer = new RenderTemplate(cf.header, getHeaderTemplate);
const mainViewer = new RenderTemplate(cf.container, getMainTemplate);

const executeCarousel = ({ header, main }) => {
  headerViewer.rendering(header);
  mainViewer.rendering(main);
  
  const carousel = new Carousel(cf);
  carousel.init();
}


export default executeCarousel;