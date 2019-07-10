import Carousel from '../components/Carousel.js';
import { isContainClass, mergeConfig } from '../utils/index.js';
import Store from '../model/index.js';

export default ({ classNameObj, options }) => {
  const defaultOptions = {
    infinite: true,
    duration: 300,
    animation: 'cubic-bezier(0.240, -0.010, 0.400, 1.650)'
  };

  options = mergeConfig(defaultOptions, options);

  const store = new Store({
    currentItem: 1,
    itemLength: document.querySelector(classNameObj.container).children.length,
    infinite: options.infinite
  });

  const carouselClickHandler = evt => {
    const { state } = store;

    if (isContainClass(evt.target, 'prev')) {
      store.setState({
        ...state,
        currentItem: state.currentItem - 1
      });
    }

    if (isContainClass(evt.target, 'next')) {
      store.setState({
        ...state,
        currentItem: state.currentItem + 1
      });
    }
  };

  function transitionEndHandler() {
    const { state } = store;
    if (isEndOfCards(state.currentItem) && options.infinite) {
      moveWithoutTransition.call(this, state.currentItem);
    }
  }

  function moveWithoutTransition(currentItem) {
    this.setTransition(this.slider, false);
    const moveItem = currentItem === 0 ? this.itemLength : 1;
    this.moveSlider(moveItem);
    setTimeout(() => {
      store.setState({
        ...store.state,
        currentItem: moveItem
      });
      this.setTransition(this.slider, true);
    }, 0);
  }

  const isEndOfCards = id => isFirst(id) || isLast(id);
  const isFirst = id => (options.infinite ? id === 0 : id === 1);
  const isLast = id =>
    options.infinite ? id === store.state.itemLength + 1 : id === store.state.itemLength;

  const props = {
    currentItem: store.state.currentItem,
    infinite: store.state.infinite
  };

  const carousel = new Carousel({
    container: classNameObj.container,
    config: options,
    onClick: carouselClickHandler.bind(this),
    onTransitionEnd: transitionEndHandler,
    moveWithoutTransition,
    props
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
