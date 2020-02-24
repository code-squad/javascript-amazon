import navNavDataController from "./navinner.js";
import library from "./library.js";
const navNavDataControllerCall = new navNavDataController();
navNavDataControllerCall.render();
const navItems = library.$$(".nav_item");

class NavAnimation {
  constructor(navItems) {
    this.navItems = navItems;
  }

  navBarScale(counter) {
    this.navItems.forEach((el, index) => {
      el.addEventListener("click", () => {
        if (index + 1 === counter) {
          return;
        } else {
          const beforePointer = counter - 1;
          counter = index + 1;
          this.navItems[beforePointer].style.transform = "none";
          this.navItems[counter - 1].style.transform = "scale(1.1)";
        }
      });
    });
  }

  nextScale(counter, maxCounter) {
    if (counter === maxCounter) {
      this.navItems[counter - 2].style.transform = "none";
      this.navItems[0].style.transform = "scale(1.1)";
      return;
    }

    this.navItems[counter - 2].style.transform = "none";
    this.navItems[counter - 1].style.transform = "scale(1.1)";
  }
  prevScale(counter, minCounter) {
    if (counter === minCounter) {
      this.navItems[counter].style.transform = "none";
      this.navItems[items.length - 3].style.transform = "scale(1.1)";
      return;
    }

    this.navItems[counter].style.transform = "none";
    this.navItems[counter - 1].style.transform = "scale(1.1)";
  }
}

export default NavAnimation;
