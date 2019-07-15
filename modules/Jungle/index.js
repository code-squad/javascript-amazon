import * as containers from './containers/index.js';

class Jungle {
  createCarousel({ classNameObj, options }) {
    return new containers.CarouselContainer({ classNameObj, options });
  }

  createAutoComplete({ classNameObj, options }) {
    return new containers.AutoCompleteContainer({ classNameObj, options });
  }
}

export default Jungle;
