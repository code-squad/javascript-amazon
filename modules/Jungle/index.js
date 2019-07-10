import Carousel from './components/Carousel.js';
import Navigation from './components/Navigation.js';
import * as containers from './containers/index.js';

class Jungle {
  createCarousel({ classNameObj, options }) {
    return containers.Carousel({ classNameObj, options });
  }

  // createNavigation({ elClassNameObj, options, model = new model() }) {
  //   const navigation = new Navigation(elClassNameObj, options, model);
  //   navigation.init();

  //   return navigation;
  // }
}

export default Jungle;
