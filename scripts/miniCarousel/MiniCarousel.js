import RAFAction from './rAFModule/RAFAction.js';
import CommonLib from '../commonLib.js';

export default class MiniCarousel extends CommonLib {
  constructor({ htmlElSelector, timer }) {
    super();
    const baseEl = document.querySelector(`${htmlElSelector} .mini-carousel`);

    this.base = baseEl;
    this.cardSlot = baseEl.querySelector('.carousel__cardSlot');
    this.animFrame = new RAFAction();
    this.autoRotationTiming = timer.autoRotationTiming;
    this.autoRotationDebounce = timer.autoRotationDebounce;
  }

  createLiHTMLWithJSON(jsonArr) {
    const { id, src, alt } = jsonArr;
    const len = jsonArr.length;
    const setLast = slotId => (slotId === len ? 'Last' : slotId);

    return `
    <li class="carousel__card slot${setLast(id)}">
      <img class="carousel__thumbnail" data-imgId="${id}" src="${src}" alt="${alt}" />
    </li>
    `;
  }

  fetchCarouselRes(resURI) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', this.setCarouselInnerHTML.bind(this));
    xhr.open('GET', resURI);
    xhr.send();
  }

  setCarouselInnerHTML({ target: xhrResult }) {
    const HTMLtxt = this.xhrToHTML(xhrResult);

    if (!HTMLtxt) return;
    this.cardSlot.innerHTML = HTMLtxt;

    this.bContentsReady = true;
    if (this.bPageLoaded) this.displayMiniCarousel();
  }

  xhrToHTML(xhrResult) {
    if (xhrResult.status !== 200) {
      console.log(`request failed - result status code: ${xhrResult.status}`);
      return false;
    }

    const dataArr = JSON.parse(xhrResult.response);

    return dataArr.reduce((acc, obj) => `${acc}${this.createLiHTMLWithJSON(obj)}\n`, '');
  }

  displayMiniCarousel() {
    const firstImg = this.cardSlot.querySelector('.carousel__thumbnail');
    if (!firstImg.complete) {
      setTimeout(this.displayMiniCarousel.bind(this), 500);
    }

    this.setCarouselInitialWidth();
    this.base.classList.add('ready');
  }

  setCarouselInitialWidth() {
    const target = this.cardSlot;
    const firstChildWidth = target.children[0].offsetWidth;

    if (!firstChildWidth) return false;

    if (target.style.width !== firstChildWidth) {
      target.style.width = `${Math.round(firstChildWidth) - 1}px`;
    }
    return true;
  }

  initOnLoad() {
    this.bPageLoaded = true;
    if (this.bContentsReady) this.displayMiniCarousel();

    this.setListenerToController();
    this.startAutoRotate();
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

  startAutoRotate() {
    const rotateFn = this.moveCardNext.bind(this);
    const rAF = this.animFrame;
    const rotationTiming = this.autoRotationTiming;
    let lastTimeStamp = 0;

    function rotate(timestamp) {
      const bTimeToPaint = timestamp - lastTimeStamp >= rotationTiming;
      if (bTimeToPaint) {
        rotateFn();
        lastTimeStamp = timestamp;
      }
      rAF.animate(rotate);
    }

    rAF.animate(rotate);
  }

  pauseAutoRotate() {
    this.animFrame.stop();

    if (!this.animFrame.funcOnDebounce) {
      this.animFrame.funcOnDebounce = super
        .debounce(this.startAutoRotate, this.autoRotationDebounce)
        .bind(this);
    }
    this.animFrame.funcOnDebounce();
  }

  moveCardNext() {
    const cards = this.base.querySelectorAll('.carousel__card');
    const len = cards.length;

    function minusOne(numStr, total) {
      if (numStr === 'Last') return total - 1;

      const num = parseInt(numStr, 10);
      return num === 1 ? 'Last' : `${num - 1}`;
    }
    const updator = (_, $1, $2) => `${$1}${minusOne($2, len)}`;

    cards.forEach(card => this.updateCardClass(card, updator));
  }

  moveCardBefore() {
    const cards = this.base.querySelectorAll('.carousel__card');
    const len = cards.length;

    function plusOne(numStr, total) {
      if (numStr === 'Last') return 1;

      const num = parseInt(numStr, 10);
      return num === total - 1 ? 'Last' : (num % total) + 1;
    }
    const updator = (_, $1, $2) => `${$1}${plusOne($2, len)}`;

    cards.forEach(card => this.updateCardClass(card, updator));
  }

  updateCardClass(card, updatorFn) {
    const updatedClassName = card.className.replace(/(slot)([0-9]|Last)/, updatorFn);

    card.className = updatedClassName;

    return card.className;
  }
}
