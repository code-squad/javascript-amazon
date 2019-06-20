"use strict";

class Carousel {
  constructor(input, option) {
    this.carousel = document.querySelector(input);
    this.items = this.carousel.children;
    this.width = this.carousel.offsetWidth;
    this.itemsInitCount = this.items.length;
    this.currentPointer = -this.width;
    this.option = option;

    this.prevBtn = document.querySelector(".btn-prev");
    this.nextBtn = document.querySelector(".btn-next");

    this.config = {
      active: "active",
      clone: "clone"
    };
  }

  isInfinite() {
    return this.option.infinite;
  }

  setCarouselItem() {
    this.appendCloneItem(
      this.carousel,
      this.items[0],
      this.items[this.itemsInitCount - 1]
    );
    return this.items.length;
  }

  setCarouselPosition() {
    if (this.option.infinite) {
      this.carousel.style.left = `-${this.width}px`;
      this.items[1].classList.add(this.config.active);
    } else {
      this.items[0].classList.add(this.config.active);
    }
  }

  init() {
    let itemsCount = this.items.length;
    if (this.option.infinite) {
      itemsCount = this.setCarouselItem();
    }

    this.setCarouselFullWidth(itemsCount);
    this.setAttrToElement(this.items, "data-index");
    this.setCarouselPosition();

    this.attchEventToBtn();
  }

  appendCloneItem(parentNode, firstItem, lastItem) {
    let firstCloneItem = firstItem.cloneNode(true);
    let lastCloneItem = lastItem.cloneNode(true);

    parentNode.prepend(lastCloneItem);
    parentNode.appendChild(firstCloneItem);

    this.addElementToClass(firstCloneItem, this.config.clone);
    this.addElementToClass(lastCloneItem, this.config.clone);
  }

  addElementToClass(elementName, className) {
    elementName.classList.add(className);
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
      if (this.option.infinite && navoption === false) {
        elementName[i].setAttribute(attrName, i);
      } else {
        elementName[i].setAttribute(attrName, i + 1);
      }
    });
  }

  getActiveItem() {
    let active = document.querySelector(`.${this.config.active}`);
    return active.dataset.index;
  }

  updateActiveItem(activeIndex, moveValue, navoption = false) {
    this.items[activeIndex].classList.remove(this.config.active);
    if (navoption) {
      this.items[moveValue].classList.add(this.config.active);
    } else {
      this.items[Number(activeIndex) + moveValue].classList.add(
        this.config.active
      );
    }
    let newActiveItem = document.querySelector(".active");
    return newActiveItem;
  }

  updateCloneActiveItem(newActiveItem, value) {
    newActiveItem.classList.remove(this.config.active);
    this.items[value].classList.add(this.config.active);
  }

  moveCarousel(moveValue, navoption) {
    if (navoption) {
      this.currentPointer = moveValue;
    } else {
      this.currentPointer += moveValue * this.width;
    }
    this.carousel.style.left = `${this.currentPointer}px`;
  }

  moveCloneCarousel(newPointerValue) {
    this.carousel.style.left = `-${newPointerValue}px`;
    this.currentPointer = -newPointerValue;
  }

  attchEventToBtn() {
    this.prevBtn.addEventListener("click", () => {
      let activeIndex = this.getActiveItem();
      let newActiveItem = this.updateActiveItem(activeIndex, -1);
      this.moveCarousel(1);

      if (
        this.option.infinite &&
        newActiveItem.classList.contains(this.config.clone)
      ) {
        this.updateCloneActiveItem(newActiveItem, this.itemsInitCount);
        let newPointerValue = this.width * this.itemsInitCount;
        this.moveCloneCarousel(newPointerValue);
      }
    });
    this.nextBtn.addEventListener("click", () => {
      let activeIndex = this.getActiveItem();
      let newActiveItem = this.updateActiveItem(activeIndex, 1);
      this.moveCarousel(-1);

      if (
        this.option.infinite &&
        newActiveItem.classList.contains(this.config.clone)
      ) {
        this.updateCloneActiveItem(newActiveItem, 1);
        let newPointerValue = this.width;
        this.moveCloneCarousel(newPointerValue);
      }
    });
  }
}

export default Carousel;
