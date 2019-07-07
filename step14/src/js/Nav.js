import Observer from './lib/Observer';

const Nav = class extends Observer {
  constructor({ nav, navItem }) {
    super();
    this.navItemName = navItem;
    this.nav = document.querySelector(nav);
    this.navItems = [...this.nav.querySelectorAll(navItem)];
  }

  init() {
    this.subject.setState({
      prevNavItem: 0,
      currNavItem: null,
    });
    this.attachEvent();
  }

  reportEvent(e) {
    const { index } = e.target.closest(this.navItemName).dataset;
    const { name } = this.constructor;
    this.subject.setState({ currNavItem: index });
    this.subject.updateState(name);
  }

  attachEvent() {
    this.nav.addEventListener('click', e => {
      this.reportEvent(e);
    });
  }

  update(state) {
    let { prevNavItem, currNavItem } = state;
    const maxIndex = this.this.navItems.length;
    const minIndex = 0;
    if (currNavItem === maxIndex) currNavItem = minIndex;
    else if (currNavItem === minIndex) currNavItem = maxIndex - 1;

    this.navItems[prevNavItem].classList.remove('active');
    this.navItems[currNavItem].classList.add('active');
    this.subject.setState({ prevNavItem: currNavItem });
  }
};

export default Nav;
