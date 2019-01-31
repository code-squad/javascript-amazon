import { qs, getAjax } from "./util.js";

class Carousel_middle {
  constructor(elObj, urlObj, optionObj) {
    this.container = qs(document, elObj.container);
    this.right = qs(document, elObj.rightBtn);
    this.left = qs(document, elObj.leftBtn);
    this.anchorEl = qs(document, elObj.anchorEl);
    this.ajaxDataUrl = urlObj.ajaxDataUrl;
    this.carouselSize = optionObj.carouselSize;
    this.transitionTime = optionObj.transitionTime;
    this.transitionPart = optionObj.transitionPart;
    this.carouselAutoMovingMS = optionObj.carouselAutoMovingMS;
    this.bPlay = false;
    this.bMouseOver = false;
    this.init();
  }

  init() {
    getAjax(this.handler.bind(this), this.ajaxDataUrl);
    this.checkAuto();
    this.carouselAuto();
  }

  handler(parsedObj) {
    this.imgUrlArr = parsedObj.backgroundUrl;
    this.linkUrlArr = parsedObj.linkArr;
    this.right.addEventListener("click", this.moveRight.bind(this));
    this.left.addEventListener("click", this.moveLeft.bind(this));
  }

  moveAuto() {
    if (this.bMouseOver) {
      setTimeout(this.moveAuto.bind(this), this.carouselAutoMovingMS);
      return;
    }
    this.moveRight();
    setTimeout(this.moveAuto.bind(this), this.carouselAutoMovingMS);
  }

  moveRight() {
    if (this.bPlay) return;
    this.bPlay = true;
    this.imgUrlArr.push(this.imgUrlArr.shift());
    this.linkUrlArr.push(this.linkUrlArr.shift());
    let nowShowingLink = this.linkUrlArr[1];
    this.initLink(nowShowingLink);
    this.container.style.transform = `translateX(-${this.carouselSize})`;
    this.transitionendEvent();
  }

  moveLeft() {
    if (this.bPlay) return;
    this.bPlay = true;
    this.imgUrlArr.unshift(this.imgUrlArr.pop());
    this.linkUrlArr.unshift(this.linkUrlArr.pop());
    let nowShowingLink = this.linkUrlArr[1];
    this.initLink(nowShowingLink);
    this.container.style.transform = `translateX(${this.carouselSize})`;
    this.transitionendEvent();
  }

  initLink(linkArr) {
    this.anchorEl.href = `${linkArr}`
  }
  
  transitionendEvent() {
    this.container.addEventListener(
      "transitionend",
      this.shuffleArr.bind(this)
    );
    this.container.style.transition = `${this.transitionPart} ${this.transitionTime}`;
  }

  shuffleArr() {
    this.imgUrlArr.forEach((v, i) => {
      const part = qs(document, `.index${i}`);
      part.style = `background-image:url(${v})`;
    });
    this.container.style.transition = "all 0s";
    this.container.style.transform = "translateX(0px)";
    this.bPlay = false;
  }

  checkAuto() {
    const middleBodyCarousel = document.querySelector(".middle-body-carousel");
    middleBodyCarousel.addEventListener("mouseover", this.mouseOver.bind(this));
    middleBodyCarousel.addEventListener("mouseout", this.mouseOut.bind(this));
  }

  mouseOver() {
    this.bMouseOver = true;
  }

  mouseOut() {
    this.bMouseOver = false;
  }

  carouselAuto() {
    setTimeout(this.moveAuto.bind(this), this.carouselAutoMovingMS);
  }
}

export { Carousel_middle };
