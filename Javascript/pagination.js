class Pagination {
  constructor() {
    this.navList = document.querySelector(".navigation-list");
    this.navItems = this.navList.children;
  }

  init(carousel) {
    this.carousel = carousel;
    const navoption = true;
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
    this.navList.addEventListener("click", target => {
      let navIndex = target.target.dataset.navIndex;
      let navPointer = -(this.carousel.width * navIndex);
      let currentactiveIndex = this.carousel.getActiveItem();
      this.scaleUp(navIndex - 1);
      
      this.carousel.updateActiveItem({
        "activeIndex" : currentactiveIndex, 
        "moveValue" : navIndex,
        "navOption" : true
      });
      navPointer = -(this.carousel.width * navIndex);
      this.carousel.moveCarousel(navPointer, true);
    });
  }
}

export default Pagination;
