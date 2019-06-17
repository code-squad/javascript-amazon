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

// let currentPointer = -carouselWidth;
// prevBtn.addEventListener("click", function() {
//   let active = document.querySelector(".active");
//   let activeIndex = active.getAttribute("data-index");
//   carousel.children[Number(activeIndex) - 1].classList.add("active");
//   currentPointer += carouselWidth;
//   carousel.style.left = `${currentPointer}px`;

//   carousel.children[activeIndex].classList.remove("active");
//   let newActive = carousel.children[Number(activeIndex) - 1];
//   if (newActive.classList.contains("clone")) {
//     carousel.style.left = `-${carouselWidth * carouselInitCnt}px`;
//     newActive.classList.remove("active");
//     carousel.children[carouselInitCnt].classList.add("active");
//     currentPointer = -(carouselWidth * carouselInitCnt);
//   }
// });

// nextBtn.addEventListener("click", function() {
//   let active = document.querySelector(".active");
//   let activeIndex = active.getAttribute("data-index");

//   carousel.children[Number(activeIndex) + 1].classList.add("active");

//   let newActive = carousel.children[Number(activeIndex) + 1];
//   currentPointer -= carouselWidth;
//   carousel.style.left = `${currentPointer}px`;

//   carousel.children[activeIndex].classList.remove("active");

//   if (newActive.classList.contains("clone")) {
//     carousel.style.left = `-${carouselWidth}px`;
//     newActive.classList.remove("active");
//     carousel.children[1].classList.add("active");
//     currentPointer = -carouselWidth;
//   }
// });

class Carousel {
  constructor(input, option) {
    this.carousel = document.querySelector(input);
    this.carouselWrap = this.carousel.parentNode;
    this.carouselItems = this.carousel.children;
    this.carouselWidth = this.carousel.offsetWidth;
    this.carouselItemsCnt = this.carouselItems.length;
    this.option = option;
  }

  init() {
    this.appendCloneItem(
      this.carousel,
      this.carouselItems[0],
      this.carouselItems[this.carouselItemsCnt - 1]
    );
    let carouselFullWidth = this.calcCarouselFullWidth(this.option.infinite);
    this.setCarouselFullWidth(carouselFullWidth);
    this.setAttrToElement("data-index");
    this.addElementToClass();
  }

  calcCarouselFullWidth(isInfinite) {
    if (isInfinite) {
      this.carouselItemsCnt += 2;
    }
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

    // 기능은 동작하는데 error 발생
    this.addElementToClass(firstCloneItem, "clone");
    this.addElementToClass(lastCloneItem, "clone");
  }

  setAttrToElement(attrName) {
    let cnt = this.carouselItems.length;
    for (let i = 0; i < cnt; i += 1) {
      this.carouselItems[i].setAttribute(attrName, i);
    }
  }
}

const carousel = new Carousel(".carousel", {
  infinite: true
});
carousel.init();
