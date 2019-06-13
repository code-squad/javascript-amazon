// const helper = require('./helper');
import helper from './helper.js';

class Carousel {
  constructor(){
    this.carousel = document.querySelector('.carousel__content');
    this.container = this.carousel.querySelector('.carousel__container');
    this.item = this.carousel.querySelector('.carousel__item');
    this.prev = document.querySelector('.prev');
    this.next = document.querySelector('.next');
    this.itemWidth = this.item.offsetWidth;
    this.offset = 0;
    this.currentItem = 1;
    // 설정 정보
    this.config = {
      duration: 200,
      easing: 'ease-out'
    };
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
  }
  attachEvent() {
    this.prev.addEventListener('click', this.moveToPrev.bind(this));
    this.next.addEventListener('click', this.moveToNext.bind(this));
  }
  moveToNext() {
    // carousel-container 요소를 왼쪽으로 이동시키기 위해 이동거리를 캐러셀 아이템의 너비만큼 감소시킨다.
    this.offset -= this.itemWidth;
    // 다음 슬라이더로 이동하기 위해 carousel-container 요소를 왼쪽으로 이동시킨다.
    this.move();
    // 현재 표시 중인 캐러셀 아이템 인덱스(1~4)
    this.currentItem++;
    // prev, next 버튼 활성화/비활성화 결정
    // this.checkMovable();
  }
  moveToPrev() {
    // carousel-container 요소를 오른쪽으로 이동시키기 위해 이동거리를 캐러셀 아이템의 너비만큼 증시킨다.
    this.offset += this.itemWidth;
    // 이전 슬라이더로 이동하기 위해 carousel-container 요소를 오른쪽으로 이동시킨다.
    this.move();
    // 현재 표시 중인 캐러셀 아이템 인덱스(1~4)
    this.currentItem--;
    // prev, next 버튼 활성화/비활성화 결정
    // this.checkMovable();
  }
  move() {
    this.container.style.transition = `transform ${this.config.duration}ms ${this.config.easing}`;
    this.container.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }
}

const carousel = new Carousel();
carousel.init()

