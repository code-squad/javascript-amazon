import { $querySelectorAll, $addListener } from "../util.js";

export default class Navigation {
  constructor(data) {
    this.name = "navigation";
    this.data = data;
    this.slideAnimMediator = null;
    this.elements = null;
  }

  _makeNavMenu(navs, [category, numOfDots], i) {
    let dots = "";
    for (let i = 0; i < numOfDots; i++) {
      dots += "<div></div>";
    }
    navs += `<div class= "nav-menu ${category.toLowerCase()} ${
      i === 0 ? "selected" : ""
    }" "${category}">${category}<div class="dots">${dots}</div></div>`;
    return navs;
  }

  render() {
    const dataToMakeNav = {};
    this.data.forEach(({ category }) => {
      dataToMakeNav[category] = dataToMakeNav[category] + 1 || 1;
    });
    const navMenu = Object.keys(dataToMakeNav)
      .map(key => [key, dataToMakeNav[key]])
      .reduce(this._makeNavMenu, "");
    return `<div class="nav-list">${navMenu}</div>`;
  }

  onClickEventHandler() {
    this.elements = $querySelectorAll(".nav-menu");
    this.elements.forEach((menu, i) =>
      $addListener(menu, "click", () => this._requestSlideAnimation(i))
    );
  }

  _requestSlideAnimation(index) {
    this.slideAnimMediator.slide(this.name, index);
  }

  update(i) {
    this.elements.forEach(menu => menu.classList.remove("selected"));
    this.elements[i].classList.add("selected");
  }
}
