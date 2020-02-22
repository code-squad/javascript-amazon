import Navigation from "./navigation.js";
import Cards from "./cards.js";
import Buttons from "./buttons.js";
import SlideAnimationMediator from "../slide-anim-mediator.js";

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
  }
}
