class RAFAction {
  constructor() {
    this.RAFId = null;
  }

  animate(callback) {
    this.RAFId = requestAnimationFrame(callback);
  }

  stop() {
    cancelAnimationFrame(this.RAFId);
  }
}
export default class MiniCarousel {
  constructor({ htmlElSelector, resURI, util }) {
    const baseEl = document.querySelector(`${htmlElSelector} .mini-carousel`);

    this.base = baseEl;
    this.cardSlot = baseEl.querySelector('.carousel__cardSlot');
    this.resURI = resURI;
    this.animFrame = new RAFAction();
    this.util = util;
  }

  createLiHTMLWithJSON({ id, src, alt }) {
    return `<li class="carousel__card slot${id}"><img class="carousel__thumbnail" data-imgId="${id}" src="${src}" alt="${alt}" /></li>`;
  }

  fetchCarouselJSONToSlot(resURI, targetEl, useXHR = true) {
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

      const target = targetEl;
      target.innerHTML = HTMLtxt;
    }

    if (useXHR) {
      const xhr = new XMLHttpRequest();

      xhr.addEventListener('load', process.bind(this));
      xhr.open('GET', resURI);
      xhr.send();

      return;
    }

    fetch(resURI)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error, status = ${res.status}`);

        return res.json();
      })
      .then(res => res.reduce((acc, obj) => `${acc}${this.createLiHTMLWithJSON(obj)}\n`, '\n'))
      .then((res) => {
        const target = targetEl;
        target.innerHTML = res;
      });
  }

  fetchCarouselRes() {
    this.fetchCarouselJSONToSlot(this.resURI, this.cardSlot);
  }

  setCarouselsInitialWidth() {
    const target = this.cardSlot;
    const firstChildWidth = target.children[0].offsetWidth;

    target.style.width = `${Math.round(firstChildWidth) - 1}px`;
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
    this.setCarouselsInitialWidth();
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
