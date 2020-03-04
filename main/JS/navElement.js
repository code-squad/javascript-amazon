import util from "./util.js";

const nav = util.$(".nav");

class NavElement {
  constructor() {}

  createNavElement(localData) {
    localData.navData.forEach(el => {
      const navItem = util.createElement("div");
      navItem.className = el.className;
      navItem.innerText = el.innerText;
      nav.appendChild(navItem);
    });
  }
}

export default NavElement;
