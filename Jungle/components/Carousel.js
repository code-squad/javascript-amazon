import { mergeConfig, setCSS } from '../utils/index.js';

class Carousel {
  constructor({ container }, observer, config) {
    //DOM
    this.container = document.querySelector(container);
    this.cardSlider;

    // values
    this.itemWidth;
    this.itemLength;
    this.observer = observer;
    this.initIndex = 0;
    this.offset = 0;
    this.currentItem = this.initIndex + 1;
    this.isMoving = false;

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
  }

  manipulateDOM() {
    /*
      사용자가 입력한
      container
        card...
      구조에서

      container
        wrapper
          slider
            card...
        button prev
        button next
      구조로 DOM을 변경하는 메서드
    */
    const cardWrapper = this.makeWrapper();
    this.cardSlider = this.appendSlider(cardWrapper);
    this.moveCardsNode();
    this.container.insertAdjacentElement('afterbegin', cardWrapper);
    this.appendButtons();

    this.itemWidth = this.cardSlider.firstElementChild.getBoundingClientRect().width;
    this.itemLength = this.cardSlider.children.length;
    cardWrapper.style.width = `${this.itemWidth}px`;
  }

  makeWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('card-wrapper');

    return wrapper;
  }

  appendSlider(wrapper) {
    const slider = document.createElement('div');
    slider.classList.add('card-slider');

    wrapper.appendChild(slider);
    return slider;
  }

  moveCardsNode() {
    [...this.container.children].forEach(card => {
      this.container.removeChild(card);
      this.cardSlider.appendChild(card);
    });
  }

  makeButtons() {
    return [document.createElement('button'), document.createElement('button')].map((button, i) => {
      button.classList.add('card-control');
      if (i === 0) {
        button.classList.add('prev');
        button.innerText = '<';
      } else if (i === 1) {
        button.classList.add('next');
        button.innerText = '>';
      }
      return button;
    });
  }

  appendButtons() {
    [this.prevButton, this.nextButton] = this.makeButtons();

    this.container.insertAdjacentElement('beforeend', this.prevButton);
    this.container.insertAdjacentElement('beforeend', this.nextButton);
  }

  attatchEvent() {
    this.prevButton.addEventListener('click', () => this.prevHandler());
    this.nextButton.addEventListener('click', () => this.nextHandler());

    this.cardSlider.addEventListener('transitionend', () => this.transitionEndHandler());
  }

  setInitialUI() {
    if (this.config.infinite) {
      this.cloneVirtualCard();
      this.moveWithoutTransition();
    } else {
      this.setTransition(this.cardSlider, true);
      this.isMovable();
    }
  }

  cloneVirtualCard() {
    const firstCard = this.cardSlider.firstElementChild.cloneNode(true);
    const lastCard = this.cardSlider.lastElementChild.cloneNode(true);

    this.cardSlider.insertAdjacentElement('afterbegin', lastCard);
    this.cardSlider.insertAdjacentElement('beforeend', firstCard);
  }

  transitionEndHandler() {
    this.isMoving = false;
    if (this.isEndOfCards() && this.config.infinite) {
      this.moveWithoutTransition();
    }
  }

  prevHandler() {
    this.move({ getId: () => this.currentItem - 1 });
  }

  nextHandler() {
    this.move({ getId: () => this.currentItem + 1 });
  }

  isMovable() {
    if (this.config.infinite) return;

    this.prevButton.disabled = this.isFirst();
    this.nextButton.disabled = this.isLast();
  }

  move({ getId }) {
    if (this.isMoving) return;
    this.isMoving = true;

    const id = getId();
    const dist = this.config.infinite ? -(this.itemWidth * id) : -(this.itemWidth * (id - 1));
    this.currentItem = id;

    this.observer.notify('moveCarousel', this.makeSendId());
    this.isMovable();
    this.moveSlider(dist);
  }

  makeSendId() {
    let sendId;
    if (this.config.infinite && this.isFirst()) {
      sendId = this.itemLength;
    } else if (this.config.infinite && this.isLast()) {
      sendId = 1;
    } else {
      sendId = this.currentItem;
    }
    return sendId;
  }

  moveWithoutTransition() {
    this.setTransition(this.cardSlider, false);
    this.move({
      getId: () => (this.currentItem === 0 ? this.itemLength : 1)
    });
    setTimeout(() => {
      this.isMoving = false;
      this.setTransition(this.cardSlider, true);
    }, 0);
  }

  moveSlider(dist) {
    this.cardSlider.style.transform = `translateX(${dist}px)`;
  }

  isEndOfCards() {
    return this.isFirst() || this.isLast();
  }

  isFirst() {
    return this.config.infinite ? this.currentItem === 0 : this.currentItem === 1;
  }

  isLast() {
    return this.config.infinite
      ? this.currentItem === this.itemLength + 1
      : this.currentItem === this.itemLength;
  }

  setTransition(el, val) {
    val
      ? setCSS(el, 'transition', `transform ${this.config.duration}ms ${this.config.animation}`)
      : setCSS(el, 'transition', 'none');
  }

  getChangingIndex() {
    return this.isFirst()
      ? { addIndex: this.itemLength - 1, removeIndex: this.currentItem }
      : { addIndex: 0, removeIndex: this.itemLength - 1 };
  }
}

export default Carousel;
