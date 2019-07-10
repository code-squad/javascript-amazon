import Observer from '../observer/Observer.js';
import { mergeConfig, setCSS, removeNodes, isContainClass } from '../utils/index.js';
import { makeHTMLString } from '../template/index.js';

class Carousel extends Observer {
  constructor({ container }, model, config) {
    super();

    //DOM
    this.container = document.querySelector(container);
    this.wrapper;
    this.slider;

    // values
    this.itemWidth;
    this.itemLength;
    this.model = model;
    this.initIndex = 0;
    this.offset = 0;
    this.isMoving = false;
    this.initStatus = true;

    this.defaultConfig = {
      infinite: true,
      duration: 300,
      animation: 'cubic-bezier(0.240, -0.010, 0.400, 1.650)'
    };

    this.config = mergeConfig(this.defaultConfig, config);
  }

  init() {
    this.manipulateDOM();
    this.attatchEvent();
    this.setInitialUI();
    setCSS(this.container, 'opacity', 1);
    this.initStatus = false;
  }

  manipulateDOM() {
    const cards = [...this.container.children];
    this.setInitialDOM(cards);

    this.wrapper = this.container.firstElementChild;
    this.slider = this.wrapper.firstElementChild;
    this.itemLength = this.slider.children.length;
    this.prevButton = this.container.querySelector('button.prev');
    this.nextButton = this.container.querySelector('button.next');
  }

  setInitialDOM(cards) {
    removeNodes(cards);
    const carousel = makeHTMLString({ data: cards, type: 'carousel' });
    this.container.insertAdjacentHTML('afterbegin', carousel);
  }

  attatchEvent() {
    this.container.addEventListener('click', e => this.buttonClickHanlder(e));
    this.slider.addEventListener('transitionend', () => this.transitionEndHandler());
  }

  setInitialUI() {
    this.itemWidth = this.slider.firstElementChild.getBoundingClientRect().width;
    this.wrapper.style.width = `${this.itemWidth}px`;

    if (this.config.infinite) {
      this.cloneVirtualCard();
      this.moveWithoutTransition();
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

  buttonClickHanlder(evt) {
    const {
      state: { currentItem }
    } = this.model;
    if (isContainClass(evt.target, 'prev')) {
      this.model.setState({ currentItem: currentItem - 1 });
    }

    if (isContainClass(evt.target, 'next')) {
      this.model.setState({ currentItem: currentItem + 1 });
    }
    this.isMovable();
  }

  transitionEndHandler() {
    const {
      state: { currentItem }
    } = this.model;

    if (this.isEndOfCards(currentItem) && this.config.infinite) {
      this.moveWithoutTransition();
    }
  }

  isMovable() {
    if (this.config.infinite) return;

    const {
      state: { currentItem }
    } = this.model;

    this.prevButton.disabled = this.isFirst(currentItem);
    this.nextButton.disabled = this.isLast(currentItem);
  }

  moveWithoutTransition() {
    const {
      state: { currentItem }
    } = this.model;

    this.setTransition(this.slider, false);
    const moveItem = currentItem === 0 ? this.itemLength : 1;
    this.moveSlider(moveItem);
    setTimeout(() => {
      this.isMoving = false;
      this.setTransition(this.slider, true);
      this.model.setState({ currentItem: moveItem });
    }, 0);
  }

  moveSlider(id) {
    const dist = this.config.infinite ? -(this.itemWidth * id) : -(this.itemWidth * (id - 1));

    this.slider.style.transform = `translateX(${dist}px)`;
  }

  isEndOfCards(id) {
    return this.isFirst(id) || this.isLast(id);
  }

  isFirst(id) {
    return this.config.infinite ? id === 0 : id === 1;
  }

  isLast(id) {
    return this.config.infinite ? id === this.itemLength + 1 : id === this.itemLength;
  }

  setTransition(el, val) {
    val
      ? setCSS(el, 'transition', `transform ${this.config.duration}ms ${this.config.animation}`)
      : setCSS(el, 'transition', 'none');
  }

  // getChangingIndex() {
  //   return this.isFirst()
  //     ? { addIndex: this.itemLength - 1, removeIndex: this.currentItem }
  //     : { addIndex: 0, removeIndex: this.itemLength - 1 };
  // }

  render(state) {
    this.moveSlider(state.currentItem);
  }
}

export default Carousel;
