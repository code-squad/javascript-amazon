"use strict";
import Pagination from "./pagination.js";
import $ from "./mylibrary.js";

class Carousel {
  constructor(inputTag) {
    this.carousel = $(inputTag);
    this.items = this.carousel.children;
    this.width = this.carousel.offsetWidth;
    this.currentPointer = -this.width;

    this.prevBtn = $(".btn-prev");
    this.nextBtn = $(".btn-next");

    this.config = {
      active: "active",
      clone: "clone",
      flex: "flex",
      attr: "data-index"
    };

    //manager에게 받아서 초기화 되는 변수들
    this.initDataCnt;
    this.currentShowingIndex;
  }

  initData(data) {
    const result = data.reduce((acc, cur) => {
      acc += `<li class="carousel-item"><div class="info-img"><img src="${
        cur.imgurl
      }"></div><div class="info-text"><h3>${
        cur.title
      }</h3><ul>${this.makeDescArr(cur.desc)}</ul></div></li>`;
      return acc;
    }, "");

    this.carousel.insertAdjacentHTML("beforeend", result);
  }

  initSetting(obj, func) {
    this.initDataCnt = obj.initDataCnt;
    this.currentShowingIndex = obj.currentShowingIndex;
    this.changeNotify = func;

    this.setCarouselItem(this.initDataCnt);
    this.setCarouselFullWidth(this.items.length);
    this.setCarouselAttr(this.items, this.config.attr);
    this.setCarouselPosition();
    this.attchEventToBtn();
  }

  makeDescArr(arr) {
    const result = arr.reduce((acc, cur) => {
      acc += `<li>${cur}</li>`;
      return acc;
    }, "");
    return result;
  }

  setCarouselItem(initDataCnt) {
    this.appendCloneItem(
      this.carousel,
      this.items[0],
      this.items[initDataCnt - 1]
    );
  }

  appendCloneItem(parentNode, firstItem, lastItem) {
    const firstCloneItem = firstItem.cloneNode(true);
    const lastCloneItem = lastItem.cloneNode(true);

    parentNode.prepend(lastCloneItem);
    parentNode.appendChild(firstCloneItem);

    this.addElementToClass(firstCloneItem, this.config.clone);
    this.addElementToClass(lastCloneItem, this.config.clone);
  }

  setCarouselFullWidth(itemsCnt) {
    const fullWidth = this.width * itemsCnt;
    this.carousel.style.width = `${fullWidth}px`;
    this.addElementToClass(this.carousel, this.config.flex);
  }

  setCarouselAttr(arr, attrName) {
    const _arr = [...arr];

    _arr.forEach((v, i) => {
      _arr[i].setAttribute(attrName, i);
    });
  }

  setCarouselPosition() {
    this.carousel.style.transform = `translateX(${this.currentPointer}px)`;
    this.carousel.style.transition = `all 0s`;
    this.addElementToClass(
      this.items[this.currentShowingIndex],
      this.config.active
    );
  }

  getActiveItem() {
    const active = $(`.active`);
    return active.dataset.index;
  }

  getActiveIndex(newActiveItem) {
    let navIndex = Number(newActiveItem.dataset.index);
    if (navIndex === 0) {
      navIndex = this.initDataCnt;
    } else if (navIndex === this.initDataCnt + 1) {
      navIndex = 1;
    }
    return navIndex;
  }

  updateActiveItem(activeIndex, moveValue, navoption = false) {
    this.items[Number(activeIndex)].classList.remove(this.config.active);

    if (navoption) {
      this.items[moveValue].classList.add(this.config.active);
    } else {
      this.addElementToClass(
        this.items[Number(activeIndex) + moveValue],
        this.config.active
      );
    }
    const newActiveItem = $(".active");
    return newActiveItem;
  }

  addElementToClass(elementName, className) {
    elementName.classList.add(className);
  }

  updateCloneActiveItem(newActiveItem, value) {
    newActiveItem.classList.remove(this.config.active);
    this.items[value].classList.add(this.config.active);
    return this.items[value];
  }

  moveCarousel(moveValue, navoption) {
    if (navoption) {
      this.currentPointer = moveValue;
    } else {
      this.currentPointer += moveValue * this.width;
    }
    this.carousel.style.transition = `all 1s`;
    this.carousel.style.transform = `translateX(${this.currentPointer}px)`;
  }

  moveCloneCarousel(newPointerValue) {
    this.carousel.style.transition = `none`;
    this.carousel.style.transform = `translateX(-${newPointerValue}px)`;
    this.currentPointer = -newPointerValue;
  }

  attchEventToBtn() {
    this.prevBtn.addEventListener("click", e => {
      let activeIndex = this.getActiveItem();
      let newActiveItem = this.updateActiveItem(activeIndex, -1);
      let newActiveIndex = this.getActiveIndex(newActiveItem);
      this.changeNotify(e.target, newActiveIndex);

      if (newActiveItem.classList.contains(this.config.clone)) {
        newActiveItem = this.updateCloneActiveItem(
          newActiveItem,
          this.initDataCnt
        );
        let newPointerValue = this.width * this.initDataCnt;
        setTimeout(() => this.moveCloneCarousel(newPointerValue), 1000);
      }
    });
    this.nextBtn.addEventListener("click", e => {
      let activeIndex = this.getActiveItem();
      let newActiveItem = this.updateActiveItem(activeIndex, 1);
      let newActiveIndex = this.getActiveIndex(newActiveItem);
      this.changeNotify(e.target, newActiveIndex);

      if (newActiveItem.classList.contains(this.config.clone)) {
        newActiveItem = this.updateCloneActiveItem(newActiveItem, 1);
        let newPointerValue = this.width;
        setTimeout(() => this.moveCloneCarousel(newPointerValue), 1000);
      }
    });
  }
}

export default Carousel;
