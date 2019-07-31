import {qS} from "./koon.js";
import MainController from "./Carousel/controllers/mainController.js";
import Carousel from "./Carousel/views/carouselView.js";
import Arrows from "./Carousel/views/arrowsView.js";
import CardNavi from "./Carousel/views/cardNaviView.js";

class CarouselApp {
    constructor() {
        this.url = 'https://kkw10.github.io//Javascript/Carousel/models/localData.json';
        this.element = qS('.card-wrap');
        this.option = {
          infinite : true,
          speed : 1000,
          arrows : true,
          cardNavi : '.card-navigation'    
        };
        
        this.carousel = new Carousel(this.element, this.option);
        this.arrows = new Arrows();
        this.cardNavi = new CardNavi(this.option);
        this.mainController = new MainController(
            this.option, 
            this.carousel, 
            this.arrows, 
            this.cardNavi
        )
    }

    run() {
        this.mainController.init(this.url);
    }
}

export default CarouselApp;