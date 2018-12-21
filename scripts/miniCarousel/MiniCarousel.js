import RAFAction from './rAFModule/RAFAction.js';
import CommonLib from '../commonLib.js';

export default class MiniCarousel extends CommonLib {
  constructor({ htmlElSelector }) {
    super();
    const baseEl = document.querySelector(`${htmlElSelector} .mini-carousel`);

    this.base = baseEl;
    this.cardSlot = baseEl.querySelector('.carousel__cardSlot');
    this.animFrame = new RAFAction();
  }

  createLiHTMLWithJSON({ id, src, alt }) {
    return `
    <li class="carousel__card slot${id}">
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
    this.setCarouselInitialWidth();
    this.base.classList.add('ready');
  }

  setCarouselInitialWidth() {
    const target = this.cardSlot;
    const firstChildWidth = target.children[0].offsetWidth;

    if (target.style.width !== firstChildWidth) {
      target.style.width = `${Math.round(firstChildWidth) - 1}px`;
    }
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
    const cards = this.base.querySelectorAll('.carousel__card');

    toBeforeBtn.addEventListener('click', () => {
      this.moveCardBefore(cards);
      this.pauseAutoRotate();
    });
    toNextBtn.addEventListener('click', () => {
      this.moveCardNext(cards);
      this.pauseAutoRotate();
    });
  }

  startAutoRotate() {
    const cards = this.base.querySelectorAll('.carousel__card');
    const rotateFn = this.moveCardNext.bind(this, cards);
    const rAF = this.animFrame;
    let lastTimeStamp = 0;

    function rotate(timestamp) {
      const bTimeToPaint = timestamp - lastTimeStamp >= 3000;
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
      this.animFrame.funcOnDebounce = this.debounce(this.startAutoRotate, 5000).bind(this);
    }
    this.animFrame.funcOnDebounce();
  }

  moveCardNext(cards) {
    function minusOne(numStr) {
      const num = parseInt(numStr, 10);
      return num === 1 ? '4' : `${num - 1}`;
    }

    const updator = (_, $1, $2) => `${$1}${minusOne($2)}`;

    [...cards].forEach(card => this.updateCardClass(card, updator));
  }

  moveCardBefore(cards) {
    const updator = (_, $1, $2) => `${$1}${(parseInt($2, 10) % 4) + 1}`;

    [...cards].forEach(card => this.updateCardClass(card, updator));
  }

  updateCardClass(card, updatorFn) {
    const updatedClassName = card.className.replace(/(slot)([0-9])/, updatorFn);

    card.className = updatedClassName;

    return card.className;
  }
}
