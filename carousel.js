class Carousel {
  constructor(carouselUl, carouselScrollArrowR, carouselScrollArrowL) {
    this.carouselUl = carouselUl;
    this.carouselScrollArrowR = carouselScrollArrowR;
    this.carouselScrollArrowL = carouselScrollArrowL;
    this.lastItem = -1120;
    this.firstItem = -280;
    this.xValue = this.firstItem;
    this.moveR = -280;
    this.moveL = 280;
    this.initialVal = 0;
  }

  moveCarouselL() {
    this.carouselScrollArrowL.addEventListener('click', () => {
      if (this.xValue === this.firstItem) this.initialVal = this.lastItem;
      this.moveVal(this.moveL);
    });
  }

  moveCarouselR() {
    this.carouselScrollArrowR.addEventListener('click', () => {
      if (this.xValue === this.lastItem) this.initialVal = this.firstItem;
      this.moveVal(this.moveR);
    });
  }

  moveVal(xVal) {
    this.xValue += xVal;
    this.carouselUl.style.transition = `all, 93ms`;
    this.carouselUl.style.transform = `translateX(${this.xValue}px)`;
  }

  getInfiniteCarousel() {
    this.carouselUl.addEventListener("transitionend", () => {
      if (this.xValue <= this.firstItem && this.xValue >= this.lastItem) return;
      else {
        this.xValue = this.initialVal;
        this.carouselUl.style.transform = `translateX(${this.xValue}px)`;
        this.carouselUl.style.transition = `none`;
      }
    });
  }

  init() {
    this.getInfiniteCarousel();
    this.moveCarouselL();
    this.moveCarouselR();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const carouselUl = document.querySelector(".carousel-ul");
  const carouselScrollArrowR = document.querySelector(".scroll-right");
  const carouselScrollArrowL = document.querySelector(".scroll-left");
  const carousel = new Carousel(carouselUl, carouselScrollArrowR, carouselScrollArrowL);
  carousel.init();
});


document.addEventListener("DOMContentLoaded", () => {
  let ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', './json.txt');
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      let ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }

  };
  ourRequest.send();
});


function renderHTML(data) {
  const items = data.map((item) => {
    return `<li class="carousel-li">
              <img src="${item.imgurl}">
            </li>`;
  })
  document.querySelector(".carousel-ul").innerHTML = items.join("");
};