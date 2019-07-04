"use strict";
import Pagination from "./pagination.js";

class Carousel {
  constructor(input) {
    this.carousel = document.querySelector(input);
    this.itemsInitCount;
    this.items = this.carousel.children;
    this.width = this.carousel.offsetWidth;

    this.currentPointer = -this.width;
    this.data;

    this.prevBtn = document.querySelector(".btn-prev");
    this.nextBtn = document.querySelector(".btn-next");

    this.config = {
      active: "active",
      clone: "clone"
    };
  }

  getJsonData(url) {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.data = data;
        this.initData(this.data);
      });
  }

  initData(data) {
    let result = data.reduce((acc, cur) => {
      acc += `<li class="carousel-item"><div class="info-img"><img src="${
        cur.imgurl
      }"></div><div class="info-text"><h3>${
        cur.title
      }</h3><ul>${this.makeDescArr(cur.desc)}</ul></div></li>`;
      return acc;
    }, "");

    this.carousel.insertAdjacentHTML("beforeend", result);
    this.itemsInitCount = this.carousel.children.length;
    this.start();
  }

  makeDescArr(arr) {
    let result = arr.reduce((acc, cur) => {
      acc += `<li>${cur}</li>`;
      return acc;
    }, "");
    return result;
  }

  start() {
    this.setCarouselItem(this.items.length);
    this.setCarouselFullWidth(this.items.length);
    this.setAttrToElement(this.items, "data-index");
    this.setCarouselPosition();
    this.attchEventToBtn();
  }

  setCarouselItem(itemsCount) {
    this.appendCloneItem(
      this.carousel,
      this.items[0],
      this.items[itemsCount - 1]
    );
  }

  appendCloneItem(parentNode, firstItem, lastItem) {
    let firstCloneItem = firstItem.cloneNode(true);
    let lastCloneItem = lastItem.cloneNode(true);

    parentNode.prepend(lastCloneItem);
    parentNode.appendChild(firstCloneItem);

    this.addElementToClass(firstCloneItem, this.config.clone);
    this.addElementToClass(lastCloneItem, this.config.clone);
  }

  setCarouselFullWidth(itemsCount) {
    let fullWidth = this.width * itemsCount;
    this.carousel.style.width = `${fullWidth}px`;
    this.addElementToClass(this.carousel, "flex");
  }

  setAttrToElement(elementName, attrName, navoption = false) {
    let cnt = elementName.length;
    elementName = Array.from(elementName);

    elementName.forEach((v, i) => {
      if (navoption === false) {
        elementName[i].setAttribute(attrName, i);
      } else {
        elementName[i].setAttribute(attrName, i + 1);
      }
    });
  }

  setCarouselPosition() {
    this.carousel.style.transform = `translateX(${this.currentPointer}px)`;
    this.carousel.style.transition = `all 0s`;
    this.addElementToClass(this.items[1], this.config.active);
  }

  attchEventToBtn() {
    this.prevBtn.addEventListener("click", () => {
      let activeIndex = this.getActiveItem();
      let newActiveItem = this.updateActiveItem(activeIndex, -1);
      let navIndex = this.getNavIndex(newActiveItem);
      // this.pagination.scaleUp(navIndex - 1);
      this.moveCarousel(1);

      if (newActiveItem.classList.contains(this.config.clone)) {
        this.updateCloneActiveItem(newActiveItem, this.itemsInitCount);
        let newPointerValue = this.width * this.itemsInitCount;
        setTimeout(() => this.moveCloneCarousel(newPointerValue), 1000);
      }
    });
    this.nextBtn.addEventListener("click", () => {
      let activeIndex = this.getActiveItem();
      let newActiveItem = this.updateActiveItem(activeIndex, 1);
      let navIndex = this.getNavIndex(newActiveItem);
      // this.pagination.scaleUp(navIndex - 1);
      this.moveCarousel(-1);

      if (newActiveItem.classList.contains(this.config.clone)) {
        this.updateCloneActiveItem(newActiveItem, 1);
        let newPointerValue = this.width;
        setTimeout(() => this.moveCloneCarousel(newPointerValue), 1000);
      }
    });
  }

  addElementToClass(elementName, className) {
    elementName.classList.add(className);
  }

  getActiveItem() {
    let active = document.querySelector(`.${this.config.active}`);
    return active.dataset.index;
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
    let newActiveItem = document.querySelector(".active");
    return newActiveItem;
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

  getNavIndex(newActiveItem) {
    let navIndex = Number(newActiveItem.dataset.index);
    if (navIndex === 0) {
      navIndex = this.itemsInitCount;
    } else if (navIndex === this.itemsInitCount + 1) {
      navIndex = 1;
    }
    return navIndex;
  }
}

export default Carousel;
