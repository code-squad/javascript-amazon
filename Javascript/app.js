import koon from "./koon.js";
const {qS} = koon;

import MainController from "./controllers/mainController.js";
import Carousel from "./views/carouselView.js";
import Arrows from "./views/arrowsView.js";
import CardNavi from "./views/cardNaviView.js";

const element = qS('.card-wrap');
const option = {
  infinite : true,
  speed : 1,
  arrows : true,
  cardNavi : '.card-navigation'    
}

const carousel = new Carousel(element, option);
const arrows = new Arrows();
const cardNavi = new CardNavi(option);

const mainController = new MainController(option, carousel, arrows, cardNavi)
mainController.init();






























// import mediator from "./mediator.js";

// mediator.init('.card-wrap', {
//   infinite : true,
//   speed : 1000,
//   arrows : true,
//   cardNavigation : '.card-navigation'   
// })



