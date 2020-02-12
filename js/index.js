class AmazonCarousel {
  constructor(option) {
    this.slides = option.slides;
    this.currentIndex = option.currentIndex;
    this.maxIndex = option.maxIndex;
    this.prev = option.prev;
    this.next = option.next;
    this.nav = option.nav;
    console.log(this.nav);
  }

  moveSlides() {
    let translate = "translateX(" + -100 * this.currentIndex + "%)";
    this.slides.forEach(element => {
      console.log(element);
      element.style.transform = translate;
    });
  }

  onClickHandler() {
    this.prev.addEventListener("click", () => {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.maxIndex - 1;
      }
      this.moveSlides();
    });

    this.next.addEventListener("click", () => {
      this.currentIndex++;
      if (this.currentIndex > this.maxIndex - 1) {
        this.currentIndex = 0;
      }
      this.moveSlides();
    });

    this.nav.forEach((el, index) => {
      el.addEventListener("click", () => {
        this.currentIndex = index;
        this.moveSlides();
      });
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const carouselChildren = document.querySelectorAll(".slider > li");
  const buttonPrev = document.querySelector(".prev-btn");
  const buttonNext = document.querySelector(".next-btn");
  const buttonNav = document.querySelectorAll(".slide-navigation > li");
  let current = 0;
  let total = 4;

  const startMove = new AmazonCarousel({
    slides: carouselChildren,
    currentIndex: current,
    maxIndex: total,
    prev: buttonPrev,
    next: buttonNext,
    nav: buttonNav
  });

  startMove.onClickHandler();
});
