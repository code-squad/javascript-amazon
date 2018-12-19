export default class MiniCarousel {
  constructor({ htmlElSelector, resURI }) {
    const base = document.querySelector(`${htmlElSelector} .mini-carousel`);

    this.base = base;
    this.cardSlot = base.querySelector('.carousel__cardSlot');
    this.resURI = resURI;
  }

  createLiHTMLWithJSON({ id, src, alt }) {
    return `<li class="carousel__card slot${id}"><img class="carousel__thumbnail" data-imgId="${id}" src="${src}" alt="${alt}" /></li>`;
  }

  fetchCarouselJSONToSlot(resURI, targetEl, useXHR = false) {
    if (useXHR) {
      /* equivalent XHR codes */
      return;
    }

    fetch(resURI)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error, status = ${res.status}`);

        return res.json();
      })
      .then(res => res.reduce((acc, obj) => `${acc}${this.createLiHTMLWithJSON(obj)}\n`, '\n'))
      .then((res) => {
        /* Set width of container ul */
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

    target.style.width = `${firstChildWidth}px`;
  }

  moveCardNext(cardsEl) {
    [...cardsEl].forEach((el) => {
      const minusOne = numStr => (parseInt(numStr, 10) === 1 ? '4' : `${parseInt(numStr, 10) - 1}`);
      const currentClassName = el.className;
      const newClassName = currentClassName.replace(
        /(slot)([0-9])/,
        (_, $1, $2) => `${$1}${minusOne($2)}`,
      );

      el.className = newClassName;
    });
  }

  moveCardBefore(cardsEl) {
    [...cardsEl].forEach((el) => {
      const currentClassName = el.className;
      const newClassName = currentClassName.replace(
        /(slot)([0-9])/,
        (_, $1, $2) => `${$1}${(parseInt($2, 10) % 4) + 1}`,
      );

      el.className = newClassName;
    });
  }

  setListenerToController() {
    const toBeforeBtn = this.base.querySelector('.carousel__btnSlot:nth-of-type(1)');
    const toNextBtn = this.base.querySelector('.carousel__btnSlot:nth-of-type(2)');
    const cardsEl = this.base.querySelectorAll('.carousel__card');

    toBeforeBtn.addEventListener('click', () => {
      this.moveCardBefore(cardsEl);
    });
    toNextBtn.addEventListener('click', () => {
      this.moveCardNext(cardsEl);
    });
  }

  initOnLoad() {
    this.setCarouselsInitialWidth();
    this.setListenerToController();
  }
}
