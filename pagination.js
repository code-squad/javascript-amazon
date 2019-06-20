"use strict";

class Pagination {
  constructor(carousel) {
    this.carousel = carousel;
    this.navigation = document.querySelector(".navigation-list");
    this.navigationItems = this.navigation.children;
    this.navigationCnt = this.navigation.children.length;
  }

  init() {
    let navoption = true;
    this.carousel.setAttrToElement(
      this.navigationItems,
      "data-nav-index",
      navoption
    );

    this.attachEventToPagination();
  }

  attachEventToPagination() {
    this.navigation.addEventListener("click", e => {
      let navIndex = e.target.dataset.navIndex;
      let navPointer = -(this.carousel.carouselWidth * navIndex);
      let currentactiveIndex = this.carousel.getActiveItem();

      this.carousel.updateActiveItem(currentactiveIndex, navIndex, true);
      navPointer = -(this.carousel.carouselWidth * navIndex);
      this.carousel.moveCarousel(navPointer, true);
    });
  }
}

export default Pagination;
