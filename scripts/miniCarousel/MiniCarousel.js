import RAFAction from './rAFModule/RAFAction.js';

export default class MiniCarousel {
  constructor({ htmlElSelector, util }) {
    const baseEl = document.querySelector(`${htmlElSelector} .mini-carousel`);

    this.base = baseEl;
    this.cardSlot = baseEl.querySelector('.carousel__cardSlot');
    this.animFrame = new RAFAction();
    this.util = util;
  }

  createLiHTMLWithJSON({ id, src, alt }) {
    return `<li class="carousel__card slot${id}"><img class="carousel__thumbnail" data-imgId="${id}" src="${src}" alt="${alt}" /></li>`;
  }

  fetchCarouselRes(resURI) {
    function process(evt) {
      if (evt.target.status !== 200) {
        console.log(`request failed - result status code: ${evt.target.status}`);
      }
      const xhrResponse = evt.target.response;
      const resArr = JSON.parse(xhrResponse);
      const HTMLtxt = resArr.reduce(
        (acc, obj) => `${acc}${this.createLiHTMLWithJSON(obj)}\n`,
        '\n',
      );

      const target = this.cardSlot;
      target.innerHTML = HTMLtxt;

      this.contentsReady = true;

      if (this.loaded) {
        this.setCarouselsInitialWidth(); // update width by new images
        this.base.classList.add('ready'); // reveal section as painting completed
      }
    }

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', process.bind(this));
    xhr.open('GET', resURI);
    xhr.send();
  }

  setCarouselsInitialWidth() {
    const target = this.cardSlot;
    const firstChildWidth = target.children[0].offsetWidth;

    if (target.style.width !== firstChildWidth) {
      target.style.width = `${Math.round(firstChildWidth) - 1}px`;
    }
  }

  moveCardNext() {
    const cardsEl = this.base.querySelectorAll('.carousel__card');

    [...cardsEl].forEach((el) => {
      const target = el;
      const minusOne = numStr => (parseInt(numStr, 10) === 1 ? '4' : `${parseInt(numStr, 10) - 1}`);
      const currentClassName = el.className;
      const newClassName = currentClassName.replace(
        /(slot)([0-9])/,
        (_, $1, $2) => `${$1}${minusOne($2)}`,
      );

      target.className = newClassName;
    });
  }

  moveCardBefore() {
    const cardsEl = this.base.querySelectorAll('.carousel__card');

    [...cardsEl].forEach((el) => {
      const target = el;
      const currentClassName = el.className;
      const newClassName = currentClassName.replace(
        /(slot)([0-9])/,
        (_, $1, $2) => `${$1}${(parseInt($2, 10) % 4) + 1}`,
      );

      target.className = newClassName;
    });
  }

  setListenerToController() {
    const toBeforeBtn = this.base.querySelector('.carousel__btnSlot.prevBtn');
    const toNextBtn = this.base.querySelector('.carousel__btnSlot.nextBtn');

    toBeforeBtn.addEventListener('click', () => {
      this.moveCardBefore();
      this.pauseAutoRotate();
    });
    toNextBtn.addEventListener('click', () => {
      this.moveCardNext();
      this.pauseAutoRotate();
    });
  }

  initOnLoad() {
    this.loaded = true;
    if (this.contentsReady) {
      this.setCarouselsInitialWidth(); // set width by cached data
      this.base.classList.add('ready'); // reveal section as painting completed
    }
    this.setListenerToController();
    this.startAutoRotate();
  }

  startAutoRotate() {
    const rotateFn = this.moveCardNext.bind(this);
    const aniFrame = this.animFrame;
    let lastStamp = 0;

    function rotate(timestamp) {
      const bTimeToPaint = timestamp - lastStamp >= 3000;
      if (bTimeToPaint) {
        rotateFn();
        lastStamp = timestamp;
      }
      aniFrame.animate(rotate);
    }
    aniFrame.animate(rotate);
  }

  pauseAutoRotate() {
    this.animFrame.stop();
    if (!this.animFrame.onDebounce) {
      this.animFrame.onDebounce = this.util.debounce(this.startAutoRotate, 5000).bind(this);
    }
    this.animFrame.onDebounce();
  }
}
