import { $querySelectorAll, $addListener } from "../util.js";

export default class Buttons {
  constructor() {
    this.name = "button";
    this.slideAnimMediator = null;
    this.elements = null;
  }

  render() {
    return "<button class='prev'><i class='fas fa-arrow-left'></i></button><button class='next'><i class='fas fa-arrow-right'></i></button>";
  }

  onClickEventHandler() {
    this.elements = $querySelectorAll(".prev, .next");
    let clicked = false;
    this.elements.forEach((button, i) =>
      $addListener(button, "click", () => {
        if (!clicked) {
          clicked = true;
          this._requestSlideAnimation(i);
          setTimeout(() => (clicked = false), 600);
        }
      })
    );
  }

  _requestSlideAnimation(index) {
    this.slideAnimMediator.slide(this.name, index);
  }
}
