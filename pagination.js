"use strict";

class Pagination {
  constructor(carousel) {
    this.carousel = carousel;
    this.navList = document.querySelector(".navigation-list");
    this.navItems = this.navList.children;
  }

  init() {
    let navoption = true;
    this.carousel.setAttrToElement(this.navItems, "data-nav-index", navoption);
    this.attachEventToPagination();
    this.navItems[0].classList.add("scale");
  }

  scaleUp(navIndex) {
    let currentScale = document.querySelector(".scale");
    currentScale.classList.remove("scale");
    this.navItems[navIndex].classList.add("scale");
  }

  attachEventToPagination() {
    this.navList.addEventListener("click", e => {
      let navIndex = e.target.dataset.navIndex;
      let navPointer = -(this.carousel.width * navIndex);
      let currentactiveIndex = this.carousel.getActiveItem();

      this.scaleUp(navIndex - 1);
      this.carousel.updateActiveItem(currentactiveIndex, navIndex, true);
      navPointer = -(this.carousel.width * navIndex);
      this.carousel.moveCarousel(navPointer, true);
    });
  }
}

export default Pagination;
