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
    console.log("navvvv", this.currentIndex);
    this.nav.forEach((el, index) => {
      console.log("foreach", el);
      el.addEventListener("click", () => {
        // if (index + 1 === this.currentIndex) return;
        this.currentIndex = index + 1;
        console.log("nav", this.currentIndex);
        this.moveSlides();
      });
    });

    this.slideAll.addEventListener("transitionend", () => {
      if (this.currentIndex === 0) {
        this.slideAll.style.transition = "none";
        this.currentIndex = 4;
        console.log("", this.currentIndex);
        this.slideAll.style.transform = `translateX(${-width * this.currentIndex}px)`;
      } else if (this.currentIndex === this.maxIndex - 1) {
        this.slideAll.style.transition = "none";
        this.currentIndex = 1;
        console.log("", this.currentIndex);
        this.slideAll.style.transform = `translateX(${-width * this.currentIndex}px)`;
      }
    });
  }
}

export { NavigationBar };
