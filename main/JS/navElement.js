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
  fetch(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.createNavElement(data);
      });
  }
  render() {
    this.fetch("http://localhost:8080/JSON/localData.json");
  }
}

export default NavElement;
