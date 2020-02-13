//carousel && carousel items
const $ = name => document.querySelector(name);
const $$ = name => document.querySelectorAll(name);

const totalInfo = {
  size: 835,
  carouselMaxLength: 5,
  carouselMinLength: 0,
  returnStartPoint: 1,
  returnLastPoint: 4,
  carouselSlide: $(".carousel-slide"),
  items: $$(".carousel-slide .item"),
  navItems: $$(".nav_bar_item"),
  prevBtn: $(".btn-prev"),
  nextBtn: $(".btn-next")
};
let counter = 1;
class Carousel {
  constructor(obj) {
    //this.counter = obj.counter;
    this.size = obj.size;
    this.carouselMaxLength = obj.carouselMaxLength;
    this.carouselMinLength = obj.carouselMinLength;
    this.returnLastPoint = obj.returnLastPoint;
    this.returnStartPoint = obj.returnStartPoint;
    this.carouselSlide = obj.carouselSlide;
    this.items = obj.items;
    this.navItems = obj.navItems;
    this.prevBtn = obj.prevBtn;
    this.nextBtn = obj.nextBtn;
  }
  nextButton() {
    this.nextBtn.addEventListener("click", () => {
      if (counter === this.carouselMaxLength) {
        return;
      }
      this.carouselSlide.style.transition = "transform 0.4s ease-in-out";
      counter++;
      this.nextScale();
      this.carouselSlide.style.transform =
        "translateX(" + -this.size * counter + "px)";
    });
  }
  prevButton() {
    this.prevBtn.addEventListener("click", () => {
      if (counter <= 0) {
        return;
      }
      this.carouselSlide.style.transition = "transform 0.4s ease-in-out";
      counter--;
      this.prevScale();
      this.carouselSlide.style.transform =
        "translateX(" + -this.size * counter + "px)";
    });
  }

  transitionEndEvent() {
    this.carouselSlide.addEventListener("transitionend", () => {
      if (this.items[counter].id === "last") {
        this.carouselSlide.style.transition = "none";
        counter = this.returnStartPoint;
        this.carouselSlide.style.transform =
          "translateX(" + -this.size * counter + "px)";
      }
      if (this.items[counter].id === "first") {
        this.carouselSlide.style.transition = "none";
        counter = counter + this.returnLastPoint;
        this.carouselSlide.style.transform =
          "translateX(" + -this.size * counter + "px)";
      }
    });
  }
  nextScale() {
    if (counter === this.carouselMaxLength) {
      this.navItems[counter - 2].style.transform = "none";
      this.navItems[counter - counter].style.transform = "scale(1.1)";
      return;
    }
    this.navItems[counter - 2].style.transform = "none";
    this.navItems[counter - 1].style.transform = "scale(1.1)";
  }
  prevScale() {
    if (counter === this.carouselMinLength) {
      this.navItems[counter].style.transform = "none";
      this.navItems[counter + 3].style.transform = "scale(1.1)";
      return;
    }
    this.navItems[counter].style.transform = "none";
    this.navItems[counter - 1].style.transform = "scale(1.1)";
  }
  navBarController() {
    this.navItems.forEach((el, index) => {
      el.addEventListener("click", () => {
        if (index + 1 === counter) {
          return;
        } else {
          const beforePointer = counter - 1;
          counter = index + 1;
          this.navItems[beforePointer].style.transform = "none";
          this.navItems[counter - 1].style.transform = "scale(1.1)";
          this.carouselSlide.style.transition = "transform 0.4s ease-in-out";
          this.carouselSlide.style.transform =
            "translateX(" + -this.size * counter + "px)";
        }
      });
    });
  }
  render() {
    this.carouselSlide.style.transform =
      "translateX(" + -this.size * counter + "px)";
    this.nextButton();
    this.prevButton();
    this.transitionEndEvent();
    this.navBarController();
  }
}

const Running = new Carousel(totalInfo);
Running.render();
