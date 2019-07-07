import Observer from './lib/Observer';

const Nav = class extends Observer {
  constructor({ nav, navItem }) {
    super();
    this.navItemName = navItem;
    this.nav = document.querySelector(nav);
    this.navItems = [...this.nav.querySelectorAll(navItem)];
  }

  init() {
    this.publisher.setState({
      prevNavItem: 0,
      currNavItem: null,
    });
    this.attachEvent();
  }

  reportEvent(e) {
    const { index } = e.target.closest(this.navItemName).dataset;
    const { name } = this.constructor;
    this.publisher.setState({ currNavItem: index });
    this.publisher.updateState(name);
  }

  attachEvent() {
    this.nav.addEventListener('click', e => {
      this.reportEvent(e);
    });
  }

  update(prevNavItem, currNavItem) {
    const maxIndex = this.this.navItems.length;
    const minIndex = 0;
    if (currNavItem === maxIndex) currNavItem = minIndex;
    else if (currNavItem === minIndex) currNavItem = maxIndex - 1;

    this.navItems[prevNavItem].classList.remove('active');
    this.navItems[currNavItem].classList.add('active');
    this.publisher.setState({ prevNavItem: currNavItem });
  }
};

export default Nav;
