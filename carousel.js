"use strict";

class Carousel {
  constructor(input, option) {
    this.carousel = document.querySelector(input);
    this.items = this.carousel.children;
    this.width = this.carousel.offsetWidth;
    this.itemsInitCount = this.items.length;
    this.currentPointer = -this.width;
    this.pagination;
    this.option = option;

    this.prevBtn = document.querySelector(".btn-prev");
    this.nextBtn = document.querySelector(".btn-next");

    this.config = {
      active: "active",
      clone: "clone"
    };
  }

  init(pagination) {
    this.pagination = pagination;
    let itemsCount = this.items.length;
    if (this.option.infinite) {
      itemsCount = this.setCarouselItem();
    }

    this.setCarouselFullWidth(itemsCount);
    this.setAttrToElement(this.items, "data-index");
    this.setCarouselPosition();

    this.attchEventToBtn();
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
      this.carousel.style.transform = `translateX(${this.currentPointer}px)`;
      this.carousel.style.transition = `all 0s`;
      this.addElementToClass(this.items[1], this.config.active);
    } else {
      this.addElementToClass(this.items[0], this.config.active);
    }
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

  attchEventToBtn() {
    this.prevBtn.addEventListener("click", () => {
      let activeIndex = this.getActiveItem();
      let newActiveItem = this.updateActiveItem(activeIndex, -1);
      let navIndex = this.getNavIndex(newActiveItem);
      this.pagination.scaleUp(navIndex - 1);
      this.moveCarousel(1);

      if (
        this.option.infinite &&
        newActiveItem.classList.contains(this.config.clone)
      ) {
        this.updateCloneActiveItem(newActiveItem, this.itemsInitCount);
        let newPointerValue = this.width * this.itemsInitCount;
        setTimeout(() => this.moveCloneCarousel(newPointerValue), 1000);
      }
    });
    this.nextBtn.addEventListener("click", () => {
      let activeIndex = this.getActiveItem();
      let newActiveItem = this.updateActiveItem(activeIndex, 1);
      let navIndex = this.getNavIndex(newActiveItem);
      this.pagination.scaleUp(navIndex - 1);
      this.moveCarousel(-1);

      if (
        this.option.infinite &&
        newActiveItem.classList.contains(this.config.clone)
      ) {
        this.updateCloneActiveItem(newActiveItem, 1);
        let newPointerValue = this.width;
        setTimeout(() => this.moveCloneCarousel(newPointerValue), 1000);
      }
    });
  }
}

export default Carousel;
