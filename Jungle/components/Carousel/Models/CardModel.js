export default class CardModel {
  constructor() {
    this.carouselItems = {};
  }

  updateCarouselItem(updatedItems) {
    this.carouselItems = {...this.carouselItems, ...updatedItems};
  }
}