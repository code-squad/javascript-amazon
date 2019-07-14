import * as containers from './containers/index.js';

class Jungle {
  createCarousel({ classNameObj, options }) {
    return new containers.CarouselContainer({ classNameObj, options });
  }

  createAutoComplete({}) {
    return new containers.AutoComplete({});
  }
}

export default Jungle;
