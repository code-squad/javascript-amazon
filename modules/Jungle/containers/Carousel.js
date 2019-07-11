import Carousel from '../components/Carousel.js';
import { isContainClass, mergeConfig } from '../utils/index.js';
import Store from '../model/index.js';

export default class CarouselContainer {
  constructor({ classNameObj, options }) {
    const defaultOptions = {
      infinite: true,
      duration: 300,
      animation: 'cubic-bezier(0.240, -0.010, 0.400, 1.650)'
    };

    this.options = mergeConfig(defaultOptions, options);

    this.store = new Store({
      currentItem: 1,
      itemLength: document.querySelector(classNameObj.container).children.length,
      infinite: this.options.infinite
    });

    const props = {
      currentItem: this.store.state.currentItem,
      itemLength: this.store.state.itemLength
    };

    this.carousel = new Carousel({
      container: classNameObj.container,
      config: this.options,
      onClick: this.carouselClickHandler.bind(this),
      props
    });

    this.store.on(this.carousel);
    this.carousel.init();
  }

  carouselClickHandler(evt) {
    const { state } = this.store;
    const { currentItem, itemLength } = state;
    const { duration } = this.options;
    const carousel = this.carousel;
    let moveId;

    if (isContainClass(evt.target, 'prev')) {
      moveId = currentItem - 1;
      this.store.setState({ ...state, currentItem: moveId });
    }

    if (isContainClass(evt.target, 'next')) {
      moveId = currentItem + 1;
      this.store.setState({ ...state, currentItem: moveId });
    }

    if (this.carousel.isEndOfCards(moveId)) {
      this.sleep(this.options.duration).then(_ => {
        moveId = this.carousel.isFirst(moveId) ? itemLength : 1;
        this.carousel.moveWithoutTransition(moveId);
        this.store.setState({ ...state, currentItem: moveId }, false);
      });
    }
  }

  sleep(duration) {
    return new Promise(resolve => setTimeout(resolve, duration - 1));
  }
}

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

// return carousel;
// };
