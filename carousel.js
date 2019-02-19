class Carousel {
  constructor(carouselArgs) {
    this.carouselSpeed = carouselArgs['carouselSpeed'];
    this.carouselUl = carouselArgs['carouselUl'];
    this.carouselScrollArrowR = carouselArgs['carouselScrollArrowR'];
    this.carouselScrollArrowL = carouselArgs['carouselScrollArrowL'];
    this.timeout = carouselArgs['timeout'];
    this.lastItem = carouselArgs['lastItem'];
    this.firstItem = carouselArgs['firstItem'];
    this.xValue = this.firstItem;
    this.moveR = carouselArgs['moveR'];
    this.moveL = carouselArgs['moveL'];
    this.initialVal = carouselArgs['initialVal'];
    this.autoMove;
    this.true = 1;
    this.false = 0;
    this.isPause = 0;
  }

  moveCarouselL() {
    this.carouselScrollArrowL.addEventListener('click', () => {
      this.moveVal(this.moveL, this.firstItem, this.lastItem);
      this.isPause++;
      this.stopInterval();
    });
  }

  moveCarouselR() {
    this.carouselScrollArrowR.addEventListener('click', () => {
      this.moveVal(this.moveR, this.lastItem, this.firstItem);
      this.isPause++;
      this.stopInterval();
    });
  }

  moveVal(xVal, startItem, endItem) {
    if (this.xValue === startItem) this.initialVal = endItem;
    this.xValue += xVal;
    this.carouselUl.style.transition = `all, ${this.carouselSpeed}ms`;
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

  moveAuto() {
    this.autoMove = setInterval(() => {
      this.moveVal(this.moveR, this.lastItem, this.firstItem);
    }, this.timeout);
  }

  stopInterval() {
    clearInterval(this.autoMove);
    if (this.isPause === this.true) {
      setTimeout(() => {
        this.isPause = this.false;
        this.moveAuto();
      }, this.timeout);
    }
  }

  init() {
    this.getInfiniteCarousel();
    this.moveCarouselL();
    this.moveCarouselR();
    this.moveAuto();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const carousel = new Carousel({
    carouselSpeed: 93,
    timeout : 3000,
    lastItem : -1120,
    firstItem : -280,
    moveR : -280,
    moveL : 280,
    initialVal: 0,
    carouselUl : document.querySelector(".carousel-ul"),
    carouselScrollArrowR : document.querySelector(".scroll-right"),
    carouselScrollArrowL : document.querySelector(".scroll-left"),
  });
  carousel.init();
  getAjax();
});

function getAjax() {
  let ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', './json.txt');
  ourRequest.addEventListener("load", () => {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      let ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
  })
  ourRequest.send();

  function renderHTML(data) {
    const items = data.map((item) => {
      return `<li class="carousel-li">
                <img src="${item.imgurl}">
              </li>`;
    })
    document.querySelector(".carousel-ul").innerHTML = items.join("");
  };
}