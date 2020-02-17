class Slide {
  constructor () {
    this.currentPosition = -900;
    this.DEFALT_POSITION = 900;
    this.isPrev = false;
    this.cloneNodeLength = 2;
    this.isTransition = false;
    this.pageCard = {};
    this.slideIndex = 1;
  }

  init () {
    const firstSlideClone = $$._slideLi[0].cloneNode(true);
    const lastSlideClone = $$._slideLi[$$._slideLi.length - 1].cloneNode(true);
    $$._slideWrap.prepend(lastSlideClone);
    $$._slideWrap.append(firstSlideClone);

    $$._pageNavi[0].classList.add('active');
  }

  slideMoveHandler () {
    $$._prevBtn.addEventListener('click', () => {
      this.isPrev = true;
      this.clickPrevNext();
    });
    $$._nextBtn.addEventListener('click', () => {
      this.isPrev = false;
      this.clickPrevNext();
    });
  }

  clickPrevNext () {
    if(!this.isTransition) {
      this.countslideIndex();
      this.isTransition = true;
      this.isPrev ? this.currentPosition += this.DEFALT_POSITION : this.currentPosition -= this.DEFALT_POSITION;

      this.pageCard.setScale();
      this.pageCard.render(this.slideIndex - 1);
      this.render();
      this.setPosition();
    }
  }

  countslideIndex () {
    if(this.isPrev) {
      this.slideIndex--;
    }else {
      this.slideIndex++;
    }

    if(!this.slideIndex) {
      this.slideIndex = 4;
    }else if(this.slideIndex > 4) {
      this.slideIndex = 1;
    }
  }

  setPosition () {
    if(!this.currentPosition) {
      this.currentPosition = -1 * this.DEFALT_POSITION * ($$._slideLi.length - this.cloneNodeLength);
    }

    if(this.currentPosition === -($$._slideLi.length - 1) * this.DEFALT_POSITION) {
      this.currentPosition = this.DEFALT_POSITION * -1;
    }

    $$._slideWrap.addEventListener('transitionend', () => this.moveEventHook());
  }

  moveEventHook () {
    $$._slideWrap.style.transition = 'none';
    $$._slideWrap.style.transform = `translate(${this.currentPosition}px, 0)`;

    this.isTransition = false;
  }

  cardOn (obj) {
    this.pageCard = obj;
  }

  cardClickRender (clickIdx) {
    let beforeIdx = this.slideIndex - 1;

    if(beforeIdx > clickIdx) {
      this.currentPosition += this.DEFALT_POSITION * (beforeIdx - clickIdx);
      this.slideIndex = clickIdx + 1;
    }else if(beforeIdx < clickIdx) {
      this.currentPosition -= this.DEFALT_POSITION * (clickIdx - beforeIdx);
      this.slideIndex = clickIdx + 1;
    }else {
      return;
    }

    if(!this.isTransition) {
      this.render();
      this.setPosition();
    }
  }

  render () {
    $$._slideWrap.style.transition = `all 0.3s ease-in-out`;
    $$._slideWrap.style.transform = `translate(${this.currentPosition}px, 0)`;
  }
}

class Card {
  constructor() {
    this.scale = 1.08
  }

  setScale () {
    $$._pageNavi.forEach((element) => {
      element.classList.remove('active');
    });
  }

  render (idx) {
    $$._pageNavi[idx].classList.add('active');
  }

}

window.addEventListener('DOMContentLoaded', () => {
  const carousel = new Slide();
  const card = new Card();

  carousel.init();
  carousel.slideMoveHandler();
  carousel.cardOn(card);

  $$._pageNavi.forEach((element, idx) => {
    element.addEventListener('click', () => {
      card.setScale();
      card.render(idx);
      carousel.cardClickRender(idx);
    });
  });
});
