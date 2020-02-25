class Carousel {
  constructor(setting) {
    this.slideAll = setting.slideAll;
    this.slideChildren = setting.slideChildren;
    this.currentIndex = setting.currentIndex;
    this.maxIndex = setting.maxIndex;
    this.prev = setting.prev;
    this.next = setting.next;
    this.nav = setting.nav;

    this.buttonHandler();
  }

  moveSlides() {
    let transformOption = `translateX(${-760 * this.currentIndex}px)`;
    let transitionOption = `transform 0.4s ease-in-out`;

    this.slideAll.style.transform = transformOption;
    this.slideAll.style.transition = transitionOption;
  }

  buttonHandler() {
    const width = 760;
    this.slideAll.style.transform = `translateX(${-width * this.currentIndex}px)`;

    this.prev.addEventListener("click", () => {
      console.log("prevvvv", this.currentIndex);
      this.currentIndex--;
      this.moveSlides();
    });

    this.next.addEventListener("click", () => {
      console.log("nexttttt", this.currentIndex);
      this.currentIndex++;
      this.moveSlides();
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

export { Carousel };
