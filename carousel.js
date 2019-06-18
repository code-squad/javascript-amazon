// // 네비게이션
// let navigation = document.querySelector(".navigation-list");
// let navigationCnt = navigation.children.length;

// for (let i = 0; i < navigationCnt; i++) {
//   navigation.children[i].setAttribute("nav-index", i + 1);
// }

// navigation.addEventListener("click", function(e) {
//   let navIndex = e.target.getAttribute("nav-index");
//   let navPointer = -(carouselWidth * navIndex);
//   let currentItem = carousel.querySelector(".active");
//   currentItem.classList.remove("active");
//   carousel.children[navIndex].classList.add("active");
//   carousel.style.left = `${navPointer}px`;
//   currentPointer = navPointer;
// });

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
    this.setAttrToElement("data-index");

    if (this.option.infinite) {
      this.carousel.style.left = `-${this.carouselWidth}px`;
      this.carouselItems[1].classList.add("active");
    } else {
      this.carouselItems[0].classList.add("active");
    }

    this.attchEventToBtn();
  }

  calcCarouselFullWidth() {
    return this.carouselWidth * this.carouselItemsCnt;
  }

  setCarouselFullWidth(input) {
    this.carousel.style.width = `${input}px`;
    this.addElementToClass(this.carousel, "flex");
  }

  addElementToClass(elementName, className) {
    elementName.classList.add(className);
  }

  appendCloneItem(parentNode, firstItem, lastItem) {
    let firstCloneItem = firstItem.cloneNode(true);
    let lastCloneItem = lastItem.cloneNode(true);

    parentNode.prepend(lastCloneItem);
    parentNode.appendChild(firstCloneItem);

    this.addElementToClass(firstCloneItem, "clone");
    this.addElementToClass(lastCloneItem, "clone");
  }

  setAttrToElement(attrName) {
    let cnt = this.carouselItems.length;
    for (let i = 0; i < cnt; i += 1) {
      if (this.option.infinite) {
        this.carouselItems[i].setAttribute(attrName, i);
      } else {
        this.carouselItems[i].setAttribute(attrName, i + 1);
      }
    }
  }

  getActiveItem() {
    let active = document.querySelector(".active");
    return active.getAttribute("data-index");
  }

  updateActiveItem(activeIndex, moveValue) {
    this.carouselItems[activeIndex].classList.remove("active");
    this.carouselItems[Number(activeIndex) + moveValue].classList.add("active");
    let newActiveItem = document.querySelector(".active");
    return newActiveItem;
  }

  moveCarousel(moveValue) {
    this.currentPointer += moveValue * this.carouselWidth;
    this.carousel.style.left = `${this.currentPointer}px`;
  }

  moveCloneCarousel(newPointerValue) {
    this.carousel.style.left = `-${newPointerValue}px`;
    this.currentPointer = -newPointerValue;
  }

  updateCloneActiveItem(newActiveItem, value) {
    newActiveItem.classList.remove("active");
    this.carouselItems[value].classList.add("active");
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

const carousel = new Carousel(".carousel", {
  infinite: true
});
carousel.init();
