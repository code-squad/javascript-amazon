import * as containers from './containers/index.js';

class Jungle {
  createCarousel({ classNameObj, options }) {
    return new containers.CarouselContainer({ classNameObj, options });
  }
}

export default Jungle;
