class Carousel {
  constructor({
    carousel,
    header,
    headerItems,
    carouselMain,
    container,
    item,
    items,
    config = {
      duration: 200,
      easing: "ease-out"
    },
    currentItem = 1,
  }) {
    this.carousel = document.querySelector(carousel);
    // header
    this.header = this.carousel.querySelector(header);
    this.headerItems = [...this.header.querySelectorAll(headerItems)]

    // carousel__main
    this.carouselMain = this.carousel.querySelector(carouselMain);
    this.container = this.carousel.querySelector(container);
    this.item = this.carousel.querySelector(item);
    this.items = this.carousel.querySelectorAll(items);
    this.itemWidth = this.item.offsetWidth;
    this.offset = -this.itemWidth;
    this.currentItem = currentItem;
    this.itemsLength = this.items.length;
    this.config = config;
    this.isTransitioning = false;
  }

  init() {
    this.setCarouselSize();
    this.attachEvent();
    this.insertClone();
    this.moveWithoutAnimation();
    this.carouselMain.style.opacity = 1;
  }

  setCarouselSize() {
    this.carouselMain.style.width = this.item.offsetWidth + 'px';
    this.carouselMain.style.height = this.item.offsetHeight + 'px';
  }

  attachEvent() {
    const prev = this.carousel.querySelector('.prev');
    const next = this.carousel.querySelector('.next');
    prev.addEventListener('click', () => this.moveToPrev());
    next.addEventListener('click', () => this.moveToNext());
    this.headerItems.forEach(card => card.addEventListener('click', (e) => this.clickHeaderItem(e)));
    this.container.addEventListener('transitionend', () => this.transitionStatsToggle());
  }

  moveToNext() {
    if(!this.isTransitioning) {
      this.offset -= this.itemWidth;
      this.moveMain();
      this.currentItem++;
      if (this.isClone()) this.fakeMove();
      this.moveHeader(this.currentItem - 1);
    }
  }

  moveToPrev() {
    if(!this.isTransitioning) {
      this.offset += this.itemWidth;
      this.moveMain();
      this.currentItem--;
      if (this.isClone()) this.fakeMove();
      this.moveHeader(this.currentItem - 1);
    }
  }

  moveMain() {
    this.transitionStatsToggle();
    this.container.style.transition = `transform ${this.config.duration}ms ${this.config.easing}`;
    this.container.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }

  transitionStatsToggle() {
    this.isTransitioning = this.isTransitioning ? false : true;
  }

  insertClone() {
    const firstItem = this.items[0];
    const lastItem = this.items[this.items.length - 1];

    this.container.insertBefore(lastItem.cloneNode(true), this.container.firstChild);
    this.container.appendChild(firstItem.cloneNode(true));
  }

  isClone() {
    return this.currentItem === 0 || this.currentItem === this.itemsLength + 1;
  }

  moveWithoutAnimation() {
    this.container.style.transition = 'none';
    this.container.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }

  fakeMove() {
    if (this.currentItem === 0) {
      this.offset -= this.itemsLength * this.itemWidth;
      this.currentItem = this.currentItem + this.itemsLength;
    } else {
      this.offset += this.itemsLength * this.itemWidth;
      this.currentItem = this.currentItem - this.itemsLength;
    }
    setTimeout(() => this.moveWithoutAnimation(), this.config.duration);
  }

  clickHeaderItem({target}) {
    const clickedIndex = this.getHeaderIndex(target.closest(".carousel__header--item"));
    const currentIndex = this.currentItem - 1;
    this.offset += this.itemWidth * (currentIndex - clickedIndex);
    this.moveHeader(clickedIndex);
    this.moveMain();
    this.currentItem = clickedIndex + 1;
  }

  moveHeader(clickedIndex) {
    this.header.querySelector(".active").classList.remove("active");
    this.headerItems[clickedIndex].classList.add("active");
  }

  getHeaderIndex(element) {
    return this.headerItems.indexOf(element)
  }


}

export default Carousel;
