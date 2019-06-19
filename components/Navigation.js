class Navigation {
  constructor(className) {
    this.navItems = document.querySelectorAll(className);

    this.itemLength = this.navItems.length;
    this.selectedId = 0;
  }

  init() {
    this.attatchEvent();
  }

  attatchEvent() {
    this.navItems.forEach((item, index) => {
      item.addEventListener("click", () =>
        this.move({ getId: () => index + 1 })
      );
    });
  }

  setItem(id) {
    this.selectedId = id;
    selectNav();
  }

  selectNav() {
    // this.navItems.forEach((item, index, array) => {
    //   if (index + 1 === this.selectedId) {
    //     item.classList.add(className.selected);
    //   } else if (this.isEndOfCards()) {
    //     const { addIndex, removeIndex } = this.getChangingIndex();
    //     array[removeIndex].classList.remove(className.selected);
    //     array[addIndex].classList.add(className.selected);
    //   } else {
    //     item.classList.remove(className.selected);
    //   }
    // });
    this.navItems.forEach((item) => {
      item.classList.remove("selected");
    });
    this.navItems[this.selectedId-1].classList.add("selected");
  }
}

export default Navigation;