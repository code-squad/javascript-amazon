import Navigation from "./navigation.js.js";
import Cards from "./cards.js.js";
import Buttons from "./buttons.js.js";
import SlideAnimationMediator from "../slideAnimationMediator.js";

export default class Carousel {
  constructor(data, width) {
    this.navigation = new Navigation(data);
    this.cards = new Cards(data, width);
    this.buttons = new Buttons();
    this.width = width;
  }

  render() {
    return `
      ${this.buttons.render()}
      ${this.navigation.render()}
      ${this.cards.render()}
      `;
  }

  activateSlideAnimation() {
    const { navigation, cards, buttons } = this;

    this.slideAnimMediator = new SlideAnimationMediator();
    this.slideAnimMediator.register(navigation);
    this.slideAnimMediator.register(cards);
    this.slideAnimMediator.register(buttons);

    this.navigation.onClickEventHandler();
    this.buttons.onClickEventHandler();
    this.cards.onTransitionEndHandler(1);
  }
}
