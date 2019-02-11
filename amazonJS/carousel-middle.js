import { qs, getAjax } from "./util.js";

class Carousel_middle {
  constructor(elObj, urlObj, optionObj) {
    Object.assign(this, { elObj, urlObj, optionObj });
    this.bPlay = false;
    this.bMouseOver = false;
    this.init();
  }

  init() {
    let ajaxDataUrl = this.urlObj.ajaxDataUrl;
    getAjax(this.handler.bind(this), ajaxDataUrl);
    this.checkAuto();
    setTimeout(this.moveAuto.bind(this), this.optionObj.carouselAutoMovingMS);
  }

  handler(parsedObj) {
    this.container = qs(this.elObj.container);
    this.right = qs(this.elObj.rightBtn);
    this.left = qs(this.elObj.leftBtn);
    this.anchorEl = qs(this.elObj.anchorEl);
    this.imgUrlArr = parsedObj.backgroundUrl;
    this.linkUrlArr = parsedObj.linkArr;
    this.right.addEventListener("click", this.moveRight.bind(this));
    this.left.addEventListener("click", this.moveLeft.bind(this));
  }

  moveAuto() {
    if (this.bMouseOver) {
      setTimeout(this.moveAuto.bind(this), this.optionObj.carouselAutoMovingMS);
      return;
    }
    this.moveRight();
    setTimeout(this.moveAuto.bind(this), this.optionObj.carouselAutoMovingMS);
  }

  moveRight() {
    if (this.bPlay) return;
    this.bPlay = true;
    this.imgUrlArr.push(this.imgUrlArr.shift());
    this.linkUrlArr.push(this.linkUrlArr.shift());
    let nowShowingLink = this.linkUrlArr[1];
    this.initLink(nowShowingLink);
    this.container.style.transform = `translateX(-${this.optionObj.carouselSize})`;
    this.transitionendEvent();
  }

  moveLeft() {
    if (this.bPlay) return;
    this.bPlay = true;
    this.imgUrlArr.unshift(this.imgUrlArr.pop());
    this.linkUrlArr.unshift(this.linkUrlArr.pop());
    let nowShowingLink = this.linkUrlArr[1];
    this.initLink(nowShowingLink);
    this.container.style.transform = `translateX(${this.optionObj.carouselSize})`;
    this.transitionendEvent();
  }

  initLink(linkArr) {
    this.anchorEl = qs(this.elObj.anchorEl);
    this.anchorEl.href = `${linkArr}`;
  }

  transitionendEvent() {
    this.container.addEventListener(
      "transitionend",
      this.shuffleArr.bind(this)
    );
    this.container.style.transition = `${this.optionObj.transitionPart} ${
      this.optionObj.transitionTime
    }`;
  }

  shuffleArr() {
    this.imgUrlArr.forEach((v, i) => {
      const part = qs(`.index${i}`, this.container);
      part.style = `background-image:url(${v})`;
    });
    this.container.style.transition = "all 0s";
    this.container.style.transform = "translateX(0px)";
    this.bPlay = false;
  }

  checkAuto() {
    this.autoEventStopContainer = qs(this.optionObj.autoEventStopContainer);
    this.autoEventStopContainer.addEventListener("mouseover", this.mouseOver.bind(this));
    this.autoEventStopContainer.addEventListener("mouseout", this.mouseOut.bind(this));
  }

  mouseOver() {
    this.bMouseOver = true;
  }

  mouseOut() {
    this.bMouseOver = false;
  }
}

export { Carousel_middle };
