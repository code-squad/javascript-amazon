import controller from "./controller.js";

class Navigation {
  constructor({ nav }) {
    this.navItems = document.querySelectorAll(nav);

    this.itemLength = this.navItems.length;
    this.selectedId = 1;
  }

  init() {
    this.attatchEvent();
    this.setItem(this.selectedId);
    controller.navigation.regist(this.setItem.bind(this));
  }

  attatchEvent() {
    this.navItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        const id = index + 1;
        this.setItem(id);
        controller.navigation.sendId(id);
      });
    });
  }

  setItem(id) {
    this.selectedId = id;
    this.selectNav();
  }

  selectNav() {
    this.navItems.forEach(item => {
      item.classList.remove("selected");
    });
    this.navItems[this.selectedId - 1].classList.add("selected");
  }
}

export default Navigation;
