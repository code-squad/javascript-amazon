class Navigation {
  constructor({ nav }, options, observer) {
    this.nav = document.querySelector(nav);
    this.navItems = [...document.querySelector(nav).children];

    this.observer = observer;
    this.itemLength = this.navItems.length;
    this.selectedId = 1;
  }

  init() {
    this.attatchEvent();
    this.setItem(this.selectedId);
  }

  attatchEvent() {
    // this.nav.addEventListener('click', event => this.clickHandler(event));
    this.navItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const id = index + 1;
        this.setItem(id);
      });
    });
  }

  clickHandler(event) {
    console.log(event.target);
  }

  setItem(id) {
    this.selectedId = id;
    this.observer.notify('selectNav', this.selectedId);
    this.selectNav();
  }

  selectNav() {
    this.navItems.forEach(item => {
      item.classList.remove('selected');
    });
    this.navItems[this.selectedId - 1].classList.add('selected');
  }
}

export default Navigation;
