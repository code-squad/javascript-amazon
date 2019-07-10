import Carousel from '../components/Carousel.js';
import { isContainClass } from '../utils/index.js';
import Store from '../model/index.js';

export default ({ classNameObj, options }) => {
  const store = new Store({ currentItem: 1 });

  const carouselClickHandler = evt => {
    const { currentItem } = store.state;

    if (isContainClass(evt.target, 'prev')) {
      store.setState({ currentItem: currentItem - 1 });
    }

    if (isContainClass(evt.target, 'next')) {
      store.setState({ currentItem: currentItem + 1 });
    }
  };

  const carousel = new Carousel({
    container: classNameObj.container,
    config: options,
    onClick: carouselClickHandler.bind(this)
  });

  store.on(carousel);
  carousel.init();

  // if ('nav' in elClassNameObj) {
  //   const { duration } = options || {};

  //   const nav = this.createNavigation({
  //     elClassNameObj: { nav: elClassNameObj.nav },
  //     options: { duration },
  //     model
  //   });

  //   model.on(carousel);
  //   model.on(nav);
  // }

  return carousel;
};
