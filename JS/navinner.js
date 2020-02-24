import library from "./library.js";
import navadata from "./navdata.js";

let nav = library.$(".nav");

class NavDataController {
  constructor() {}

  innerItem() {
    navadata.forEach(el => {
      const item = library.createElement("div");
      item.className = el.className;
      item.innerText = el.innerText;
      nav.appendChild(item);
    });
  }

  render() {
    this.innerItem();
  }
}

export default NavDataController;
