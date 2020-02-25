import { $qsa, $ael } from "../util.js";

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
    this.elements = $qsa(".prev, .next");
    this.elements.forEach((button, i) =>
      $ael(button, "click", () => this._requestSlideAnim(i))
    );
  }

  _requestSlideAnim(index) {
    this.slideAnimMediator.slide(this.name, index);
  }
}
