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
      duration: 300,
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
    this.headerItems[0].classList.add('active');
    this.carouselMain.style.opacity = 1;
  }

  setCarouselSize() {
    this.carouselMain.style.width = this.item.offsetWidth + 'px';
    this.carouselMain.style.height = this.item.offsetHeight + 'px';
  }

  // step14-2 변경사항 (Event Delegation : buttons, this.header);
  attachEvent() {
    const buttons = this.carousel.querySelector('.carousel__buttons');
    buttons.addEventListener('click', ({target}) => {
      if(target.dataset.name === 'next') this.moveToNext();
      if(target.dataset.name === 'prev') this.moveToPrev();
    })
    this.header.addEventListener('click', e => this.clickHeaderItem(e))
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

  // step14-2 변경사항: li tag의 정보만 받을 수 있도록.
  clickHeaderItem({target}) {
    const mainTarget = target.closest('.carousel__header--item');
    const clickedIndex = mainTarget.dataset.id - 1;
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
}

export default Carousel;
