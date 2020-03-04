class NavAnimation {
  constructor(navItems) {
    this.navItems = navItems;
  }

  moveNextScale(counter, maxCounter) {
    if (counter === maxCounter) {
      let lastIndex = counter - 2;
      let firstIndex = 0;

      this.navItems[lastIndex].style.transform = "none";
      this.navItems[firstIndex].style.transform = "scale(1.1)";
      return;
    }

    let beforeIndex = counter - 2;
    let nextIndex = counter - 1;

    this.navItems[beforeIndex].style.transform = "none";
    this.navItems[nextIndex].style.transform = "scale(1.1)";
  }

  movePrevScale(counter, minCounter) {
    if (counter === minCounter) {
      let firstIndex = counter;
      let lastIndex = items.length - 3;

      this.navItems[firstIndex].style.transform = "none";
      this.navItems[lastIndex].style.transform = "scale(1.1)";
      return;
    }
    let beforeIndex = counter;
    let prevIndex = counter - 1;

    this.navItems[beforeIndex].style.transform = "none";
    this.navItems[prevIndex].style.transform = "scale(1.1)";
  }
}

export default NavAnimation;
