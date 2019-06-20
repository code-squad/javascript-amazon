"use strict";

class Carousel {
  constructor(input, option) {
    this.carousel = document.querySelector(input);
    this.carouselWrap = this.carousel.parentNode;
    this.carouselItems = this.carousel.children;
    this.carouselWidth = this.carousel.offsetWidth;
    this.carouselItemsInitCnt = this.carouselItems.length;
    this.carouselItemsCnt = this.carouselItems.length;
    this.currentPointer = -this.carouselWidth;
    this.option = option;

    this.prevBtn = document.querySelector(".btn-prev");
    this.nextBtn = document.querySelector(".btn-next");
  }

  init() {
    if (this.option.infinite) {
      this.appendCloneItem(
        this.carousel,
        this.carouselItems[0],
        this.carouselItems[this.carouselItemsCnt - 1]
      );
      this.carouselItemsCnt = this.carouselItems.length;
    }
    let carouselFullWidth = this.calcCarouselFullWidth();
    this.setCarouselFullWidth(carouselFullWidth);
    this.setAttrToElement(this.carouselItems, "data-index");

    if (this.option.infinite) {
      this.carousel.style.left = `-${this.carouselWidth}px`;
      this.carouselItems[1].classList.add("active");
    } else {
      this.carouselItems[0].classList.add("active");
    }

    this.attchEventToBtn();
  }

  appendCloneItem(parentNode, firstItem, lastItem) {
    let firstCloneItem = firstItem.cloneNode(true);
    let lastCloneItem = lastItem.cloneNode(true);

    parentNode.prepend(lastCloneItem);
    parentNode.appendChild(firstCloneItem);

    this.addElementToClass(firstCloneItem, "clone");
    this.addElementToClass(lastCloneItem, "clone");
  }

  addElementToClass(elementName, className) {
    elementName.classList.add(className);
  }

  calcCarouselFullWidth() {
    return this.carouselWidth * this.carouselItemsCnt;
  }

  setCarouselFullWidth(input) {
    this.carousel.style.width = `${input}px`;
    this.addElementToClass(this.carousel, "flex");
  }

  setAttrToElement(elementName, attrName, navoption = false) {
    let cnt = elementName.length;
    for (let i = 0; i < cnt; i += 1) {
      if (this.option.infinite && navoption === false) {
        elementName[i].setAttribute(attrName, i);
      } else {
        elementName[i].setAttribute(attrName, i + 1);
      }
    }
  }

  getActiveItem() {
    let active = document.querySelector(".active");
    return active.dataset.index;
  }

  updateActiveItem(activeIndex, moveValue, navoption = false) {
    this.carouselItems[activeIndex].classList.remove("active");
    if (navoption === true) {
      this.carouselItems[moveValue].classList.add("active");
    } else {
      this.carouselItems[Number(activeIndex) + moveValue].classList.add(
        "active"
      );
    }
    let newActiveItem = document.querySelector(".active");
    return newActiveItem;
  }

  updateCloneActiveItem(newActiveItem, value) {
    newActiveItem.classList.remove("active");
    this.carouselItems[value].classList.add("active");
  }

  moveCarousel(moveValue, navoption) {
    if (navoption === true) {
      this.currentPointer = moveValue;
    } else {
      this.currentPointer += moveValue * this.carouselWidth;
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

      if (this.option.infinite) {
        if (newActiveItem.classList.contains("clone")) {
          this.updateCloneActiveItem(newActiveItem, this.carouselItemsInitCnt);
          let newPointerValue = this.carouselWidth * this.carouselItemsInitCnt;
          this.moveCloneCarousel(newPointerValue);
        }
      }
    });
    this.nextBtn.addEventListener("click", () => {
      let activeIndex = this.getActiveItem();
      let newActiveItem = this.updateActiveItem(activeIndex, 1);
      this.moveCarousel(-1);

      if (this.option.infinite) {
        if (newActiveItem.classList.contains("clone")) {
          this.updateCloneActiveItem(newActiveItem, 1);
          let newPointerValue = this.carouselWidth;
          this.moveCloneCarousel(newPointerValue);
        }
      }
    });
  }
}

export default Carousel;
