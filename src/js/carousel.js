class Carousel {
  constructor({
      header,
      headerItems,
      carousel,
      container,
      item,
      items,
      prev,
      next,
      config = {duration:200, easing:"ease-out"},
      offset = 0,
      currentItem = 1,
    }){
    // header
    this.header = document.querySelector(header);
    this.headerItems = [...this.header.querySelectorAll(headerItems)]

    // carousel__main
    this.carousel = document.querySelector(carousel);
    this.container = this.carousel.querySelector(container);
    this.item = this.carousel.querySelector(item);
    this.items = this.carousel.querySelectorAll(items);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);   
    this.itemWidth = this.item.offsetWidth;
    this.offset = offset;
    this.currentItem = currentItem;
    this.itemsLength = this.items.length;
    // 설정 정보
    this.config = config
  }
  init() {
    /*
      carousel-item의 width/height는 가변이다.
      따라서 carousel의 윈도우 역할을 하는 carousel 요소의 width/height는
      첫번째 carousel-item의 width/height를 취득해 셋팅한다.
    */
    this.carousel.style.width = this.item.offsetWidth + 'px';
    this.carousel.style.height = this.item.offsetHeight + 'px';
    this.attachEvent();
    this.insertClone();
    this.offset = -this.itemWidth;
    this.moveWithoutAnimation();
    this.carousel.style.opacity = 1;
  }
  attachEvent() {
    this.prev.addEventListener('click', this.moveToPrev.bind(this));
    this.next.addEventListener('click', this.moveToNext.bind(this));
    this.headerItems.forEach(card => card.addEventListener('click', this.cardClick.bind(this)))
  }
  moveToNext() {
    // carousel-container 요소를 왼쪽으로 이동시키기 위해 이동거리를 캐러셀 아이템의 너비만큼 감소시킨다.
    this.offset -= this.itemWidth;
    // 다음 슬라이더로 이동하기 위해 carousel-container 요소를 왼쪽으로 이동시킨다.
    this.moveMain();
    // 현재 표시 중인 캐러셀 아이템 인덱스(1~4)
    this.currentItem++;
    // prev, next 버튼 활성화/비활성화 결정
    // this.checkMovable();
    if(this.isClone()) this.fakeMove();
    // ** added by Q
    this.moveHeader(this.currentItem-1);
  }
  moveToPrev() {
    // carousel-container 요소를 오른쪽으로 이동시키기 위해 이동거리를 캐러셀 아이템의 너비만큼 증시킨다.
    this.offset += this.itemWidth;
    // 이전 슬라이더로 이동하기 위해 carousel-container 요소를 오른쪽으로 이동시킨다.
    this.moveMain();
    // 현재 표시 중인 캐러셀 아이템 인덱스(1~4)
    this.currentItem--;
    // prev, next 버튼 활성화/비활성화 결정
    // this.checkMovable();
    if(this.isClone()) this.fakeMove();
    // ** added by Q
    this.moveHeader(this.currentItem-1);
  }
  moveMain() {
    this.container.style.transition = `transform ${this.config.duration}ms ${this.config.easing}`;
    this.container.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }
  insertClone() {
    const firstItem = this.items[0];
    const lastItem = this.items[this.items.length-1];

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
    if(this.currentItem === 0) {
      this.offset -= this.itemsLength * this.itemWidth;
      this.currentItem = this.currentItem + this.itemsLength;
    } else {
      this.offset += this.itemsLength * this.itemWidth;
      this.currentItem = this.currentItem - this.itemsLength;
    }
    setTimeout(() => this.moveWithoutAnimation(), this.config.duration);
  }

  cardClick(e) {
    const clickedIndex = this.getCardIndex(e.target.closest(".carousel__header--item"));
    // ** added by Q
    const currentIndex = this.currentItem - 1;
    this.offset += this.itemWidth * (currentIndex - clickedIndex);
    this.moveHeader(clickedIndex);
    // **
    this.moveMain();
    this.currentItem = clickedIndex + 1;
  } 
  // ** added by Q
  moveHeader(clickedIndex) {
    this.header.querySelector(".active").classList.remove("active");
    this.headerItems[clickedIndex].classList.add("active");
  }
  
  getCardIndex(element) {
    return this.headerItems.indexOf(element)
  }


}

export default Carousel;