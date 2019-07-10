import Carousel from './components/Carousel.js';
import Navigation from './components/Navigation.js';
import Model from './model/index.js';

class Jungle {
  createCarousel({ elClassNameObj, options, model = new Model({ currentItem: 1 }) }) {
    const carousel = new Carousel(elClassNameObj, model, options);
    carousel.init();

    if ('nav' in elClassNameObj) {
      const { duration } = options || {};

      const nav = this.createNavigation({
        elClassNameObj: { nav: elClassNameObj.nav },
        options: { duration },
        model
      });

      model.on(carousel);
      model.on(nav);
    }

    return carousel;
  }

  createNavigation({ elClassNameObj, options, model = new model() }) {
    const navigation = new Navigation(elClassNameObj, options, model);
    navigation.init();

    return navigation;
  }
}

export default Jungle;
