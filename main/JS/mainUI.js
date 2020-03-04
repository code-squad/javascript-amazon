class MainUI {
  constructor(mainObj) {
    this.counter = mainObj.counter;
    this.carouselSlide = mainObj.carouselSlide;
    this.items = mainObj.items;
    this.navItems = mainObj.totalNavItems;
    this.prev = mainObj.prev;
    this.next = mainObj.next;
    this.maxCounter = mainObj.maxCounter;
    this.minCounter = mainObj.minCounter;

    this.navAnimation = mainObj.navAnimation;
    this.carouselAnimation = mainObj.carouselAnimation;
  }

  onNextEvent() {
    this.next.addEventListener("click", () => {
      this.carouselAnimation.setTransition();
      this.counter++;
      this.carouselAnimation.moveCarouselSlideTranslateX(this.counter);
      this.navAnimation.moveNextScale(this.counter, this.maxCounter);
    });
  }

  onPrevEvent() {
    this.prev.addEventListener("click", () => {
      this.carouselAnimation.setTransition();
      this.counter--;
      this.carouselAnimation.moveCarouselSlideTranslateX(this.counter);
      this.navAnimation.movePrevScale(this.counter, this.minCounter);
    });
  }

  onTransitionEndEvent() {
    const firstIndex = 1;
    const lastIndex = this.items.length - 2;

    this.carouselSlide.addEventListener("transitionend", () => {
      if (this.items[this.counter].id === "last") {
        this.carouselAnimation.removeTransition();
        this.counter = firstIndex;
        this.carouselAnimation.moveCarouselSlideTranslateX(this.counter);
      }
      if (this.items[this.counter].id === "first") {
        this.carouselAnimation.removeTransition();
        this.counter = lastIndex;
        this.carouselAnimation.moveCarouselSlideTranslateX(this.counter);
      }
    });
  }

  clickNavItems() {
    this.navItems.forEach((el, index) => {
      el.addEventListener("click", () => {
        let beforeIndex = this.counter - 1;
        this.counter = index + 1;
        this.navItems[beforeIndex].style.transform = "none";
        this.navItems[this.counter - 1].style.transform = "scale(1.1)";
        this.carouselAnimation.setTransition();
        this.carouselAnimation.moveCarouselSlideTranslateX(this.counter);
      });
    });
  }

  render() {
    this.onNextEvent();
    this.onPrevEvent();
    this.onTransitionEndEvent();
    this.clickNavItems();
  }
}

export default MainUI;
