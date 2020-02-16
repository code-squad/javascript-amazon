class NavigationBar {
  constructor(setting) {
    this.slideAll = setting.slideAll;
    this.slideChildren = setting.slideChildren;
    this.currentIndex = setting.currentIndex;
    this.maxIndex = setting.maxIndex;
    this.prev = setting.prev;
    this.next = setting.next;
    this.nav = setting.nav;

    this.navigationHandler();
  }

  moveSlides() {
    let transformOption = `translateX(${-760 * this.currentIndex}px)`;
    let transitionOption = `transform 0.4s ease-in-out`;

    this.slideAll.style.transform = transformOption;
    this.slideAll.style.transition = transitionOption;
  }

  navigationHandler() {
    const width = 760;
    this.slideAll.style.transform = `translateX(${-width * this.currentIndex}px)`;

    this.nav.forEach((el, index) => {
      el.addEventListener("click", () => {
        if (index + 1 === this.currentIndex) return;
        this.currentIndex = index + 1;
        this.moveSlides();
      });
    });

    this.slideAll.addEventListener("transitionend", () => {
      if (this.slideChildren[this.currentIndex].className === "lastClone") {
        this.slideAll.style.transition = "none";
        this.currentIndex = this.slideChildren.length - 2;
        this.slideAll.style.transform = `translateX(${-width * this.currentIndex}px)`;
      } else if (this.slideChildren[this.currentIndex].className === "firstClone") {
        this.slideAll.style.transition = "none";
        this.currentIndex = this.slideChildren.length - this.currentIndex;
        this.slideAll.style.transform = `translateX(${-width * this.currentIndex}px)`;
      }
    });
  }
}

export { NavigationBar };
