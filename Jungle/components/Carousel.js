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

    this.config = this.mergeConfig(config);
  }

  mergeConfig(config) {
    return Object.assign(this.defaultConfig, config);
  }

  setOpacity(el, val) {
    el.style.opacity = val;
  }

  init() {
    const cards = [...this.container.children];
    cards.forEach(card => this.container.removeChild(card));

    const cardWrapper = this.appendWrapper();
    this.cardSlider = this.appendSlider(cardWrapper);

    cards.forEach(card => {
      this.cardSlider.insertAdjacentElement('beforeend', card);
    });

    this.itemWidth = this.cardSlider.firstElementChild.getBoundingClientRect().width;
    this.itemLength = this.cardSlider.children.length;
    this.appendButton();

    cardWrapper.style.width = `${this.itemWidth}px`;
    this.attatchEvent();

    if (this.config.infinite) {
      this.cloneVirtualCard();
      this.moveWithoutTransition();
    } else {
      this.setTransition(this.cardSlider, true);
      this.isMovable();
    }

    this.setOpacity(this.container, 1);
  }

  appendWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('card-wrapper');

    this.container.insertAdjacentElement('afterbegin', wrapper);

    return wrapper;
  }

  appendSlider(wrapper) {
    const slider = document.createElement('div');
    slider.classList.add('card-slider');

    wrapper.insertAdjacentElement('afterbegin', slider);
    return slider;
  }

  appendButton() {
    [this.prevButton, this.nextButton] = this.makeButtons();

    this.container.insertAdjacentElement('beforeend', this.prevButton);
    this.container.insertAdjacentElement('beforeend', this.nextButton);
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

  cloneVirtualCard() {
    const firstCard = this.cardSlider.firstElementChild.cloneNode(true);
    const lastCard = this.cardSlider.lastElementChild.cloneNode(true);

    this.cardSlider.insertAdjacentElement('afterbegin', lastCard);
    this.cardSlider.insertAdjacentElement('beforeend', firstCard);
  }

  transitionEndHandler() {
    this.isMoving = false;
    if (this.isEndOfCards()) {
      if (this.config.infinite) this.moveWithoutTransition();
    }
  }

  prevHandler() {
    this.move({ getId: () => this.currentItem - 1 });
  }

  nextHandler() {
    this.move({ getId: () => this.currentItem + 1 });
  }

  attatchEvent() {
    this.prevButton.addEventListener('click', () => this.prevHandler());
    this.nextButton.addEventListener('click', () => this.nextHandler());

    this.cardSlider.addEventListener('transitionend', () => this.transitionEndHandler());
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
      ? (el.style.transition = `transform ${this.config.duration}ms ${this.config.animation}`)
      : (el.style.transition = `none`);
  }

  getChangingIndex() {
    return this.isFirst()
      ? { addIndex: this.itemLength - 1, removeIndex: this.currentItem }
      : { addIndex: 0, removeIndex: this.itemLength - 1 };
  }
}

export default Carousel;
