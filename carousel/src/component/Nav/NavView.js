import Observer from '../../js/lib/Observer.js';

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
      currNavItem: null
    });
    this.attachEvent();
  }

  reportEvent({ target }) {
    const { index } = target.closest(this.navItemName).dataset;
    const { name } = this.constructor;
    this.subject.setState({ currNavItem: Number(index) });
    this.subject.updateState(name);
  }

  attachEvent() {
    this.nav.addEventListener('click', e => {
      this.reportEvent(e);
    });
  }

  update(state) {
    const maxIndex = this.navItems.length;
    const minIndex = -1;
    const { prevNavItem } = state;
    let { currNavItem } = state;

    if (currNavItem === maxIndex) currNavItem = 0;
    else if (currNavItem === minIndex) currNavItem = maxIndex - 1;

    this.navItems[prevNavItem].classList.remove('active');
    this.navItems[currNavItem].classList.add('active');
    this.subject.setState({ prevNavItem: currNavItem });
  }
};

export default Nav;
