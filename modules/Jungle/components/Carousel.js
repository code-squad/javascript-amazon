import Observer from '../observer/Observer.js';
import { setCSS, removeNodes } from '../utils/index.js';
import { makeHTMLString } from '../template/index.js';

class Carousel extends Observer {
  constructor({ container, config, onClick, props }) {
    super();
    //DOM
    this.container = document.querySelector(container);
    this.wrapper;
    this.slider;

    // values
    this.itemWidth;
    this.onClick = onClick;
    this.props = props;
    this.config = config;
  }

  init() {
    this.manipulateDOM();
    this.attatchEvent();
    this.setInitialUI();
    setCSS(this.container, 'opacity', 1);
  }

  manipulateDOM() {
    const cards = [...this.container.children];
    this.setInitialDOM(cards);

    this.wrapper = this.container.firstElementChild;
    this.slider = this.wrapper.firstElementChild;
    this.prevButton = this.container.querySelector('button.prev');
    this.nextButton = this.container.querySelector('button.next');
  }

  setInitialDOM(cards) {
    removeNodes(cards);
    const carousel = makeHTMLString({ data: cards, type: 'carousel' });
    this.container.insertAdjacentHTML('afterbegin', carousel);
  }

  attatchEvent() {
    this.container.addEventListener('click', e => this.onClick(e));
  }

  setInitialUI() {
    this.itemWidth = this.slider.firstElementChild.getBoundingClientRect().width;
    this.wrapper.style.width = `${this.itemWidth}px`;

    if (this.config.infinite) {
      this.cloneVirtualCard();
      this.moveWithoutTransition(1);
    } else {
      this.setTransition(this.slider, true);
      this.isMovable();
    }
  }

  cloneVirtualCard() {
    const firstCard = this.slider.firstElementChild.cloneNode(true);
    const lastCard = this.slider.lastElementChild.cloneNode(true);

    this.slider.insertAdjacentElement('afterbegin', lastCard);
    this.slider.insertAdjacentElement('beforeend', firstCard);
  }

  isMovable(id) {
    this.prevButton.disabled = this.isFirst(id);
    this.nextButton.disabled = this.isLast(id);
  }

  move(id) {
    this.setTransition(this.slider, true);
    const dist = -(this.itemWidth * id);
    this.slider.style.transform = `translateX(${dist}px)`;

    if (!this.config.infinite) {
      this.isMovable(id);
    }
  }

  moveWithoutTransition(id) {
    this.setTransition(this.slider, false);
    const dist = -(this.itemWidth * id);
    this.slider.style.transform = `translateX(${dist}px)`;
  }

  setTransition(el, val) {
    val
      ? setCSS(el, 'transition', `transform ${this.config.duration}ms ${this.config.animation}`)
      : setCSS(el, 'transition', 'none');
  }

  isEndOfCards(id) {
    return this.isFirst(id) || this.isLast(id);
  }

  isFirst(id) {
    return this.config.infinite ? id === 0 : id === 1;
  }

  isLast(id) {
    return this.config.infinite ? id === this.props.itemLength + 1 : id === this.props.itemLength;
  }

  render(state) {
    this.move(state.currentItem);
  }
}

export default Carousel;
