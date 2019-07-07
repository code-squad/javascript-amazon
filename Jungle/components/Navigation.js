class Navigation {
  constructor({ nav }, options, observer) {
    this.nav = document.querySelector(nav);
    this.navItems = [...this.nav.children];

    this.observer = observer;
    this.itemLength = this.navItems.length;
    this.selectedId = 1;
  }

  init() {
    this.setItemsId();
    this.attatchEvent();
    this.setItem(this.selectedId);
  }

  setItemsId() {
    this.navItems.forEach((item, index) => {
      item.setAttribute(`data-id`, index + 1);
    });
  }

  attatchEvent() {
    this.nav.addEventListener(`click`, ({ target }) => {
      if (target.className.includes(`nav-item`)) this.setItem(Number(target.dataset.id));
    });
  }

  setItem(id) {
    this.selectedId = id;
    this.observer.notify("selectNav", { getId: () => this.selectedId });
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
