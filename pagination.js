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
  }

  attachEventToPagination() {
    this.navList.addEventListener("click", e => {
      let navIndex = e.target.dataset.navIndex;
      let navPointer = -(this.carousel.width * navIndex);
      let currentactiveIndex = this.carousel.getActiveItem();

      this.carousel.updateActiveItem(currentactiveIndex, navIndex, true);
      navPointer = -(this.carousel.width * navIndex);
      this.carousel.moveCarousel(navPointer, true);
    });
  }
}

export default Pagination;
