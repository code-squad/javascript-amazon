class Carousel {
  constructor() {
    this.carouselUl = document.querySelector(".carousel-ul");
    this.carouselScrollArrowR = document.querySelector(".scroll-right");
    this.carouselScrollArrowL = document.querySelector(".scroll-left");
    this.lastItem = -1120;
    this.firstItem = -280;
    this.xValue = this.firstItem;
    this.moveR = -280;
    this.moveL = 280;
    this.initialVal = 0;
    this.autoMove;
    this.pause = 1;
    this.replay = 0;
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

  moveAuto() {
    this.autoMove = setInterval(() => {
      this.moveVal(this.moveR, this.lastItem, this.firstItem);
    }, 3000);
  }

  stopInterval() {
    clearInterval(this.autoMove);
    if (this.isPause === this.pause) {
      setTimeout(() => {
        this.isPause = this.replay;
        this.moveAuto();
      }, 3000);
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
    timeout : 3000,
    baseel : document.querySelector(".base-element")
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