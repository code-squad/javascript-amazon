class AmazonCarousel {
  constructor(option) {
    this.slides = option.slides;
    this.currentIndex = option.currentIndex;
    this.maxIndex = option.maxIndex;
    this.prev = option.prev;
    this.next = option.next;
    // this.onClickHandler();
  }

  moveSlides() {
    let translate = "translateX(" + -100 * this.currentIndex + "%)";
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.transform = translate;
    }
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
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const carouselChildren = document.querySelector(".slider").children;
  const buttonPrev = document.querySelector(".prev-btn");
  const buttonNext = document.querySelector(".next-btn");
  let current = 0;
  let total = 4;

  const startMove = new AmazonCarousel({
    slides: carouselChildren,
    currentIndex: current,
    maxIndex: total,
    prev: buttonPrev,
    next: buttonNext
  });

  startMove.onClickHandler();
});
