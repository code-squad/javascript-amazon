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

  clickPrevNext () {
    if(!this.isTransition) {
      this.countSlideIndex();
      this.isTransition = true;
      this.isPrev ? this.currentPosition += this.DEFALT_POSITION : this.currentPosition -= this.DEFALT_POSITION;

      this.pageCard.setScale();
      this.pageCard.addActiveLiClass(this.slideIndex - 1);
      this.moveEventHooks(true);
      this.setPosition();
    }
  }

  countSlideIndex () {
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
    const isLast = this.currentPosition === -($$._slideLi.length - 1) * this.DEFALT_POSITION;

    if(!this.currentPosition) {
      this.currentPosition = -1 * this.DEFALT_POSITION * ($$._slideLi.length - this.cloneNodeLength);
    }

    if(isLast) {
      this.currentPosition = this.DEFALT_POSITION * -1;
    }

    $$._slideWrap.addEventListener('transitionend', () => this.moveEventHooks(false));
  }

  moveEventHooks (isBeforeEvent) {
    if(isBeforeEvent) {
      $$._slideWrap.style.transition = `all 0.3s ease-in-out`;
    }else {
      $$._slideWrap.style.transition = 'none';
      this.isTransition = false;
    }

    $$._slideWrap.style.transform = `translate(${this.currentPosition}px, 0)`;
  }

  setCard (card) {
    this.pageCard = card;
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
      this.moveEventHooks(true);
      this.setPosition();
    }
  }

  render () {
    let carouselDataHTML = '';
    let myLocalStorage = localStorage.getItem("myJson");

    JSON.parse(myLocalStorage).cardList.forEach((ele) => {
      carouselDataHTML +=
        `<li class="${ele.id}">
          <img src="https://kiyoesjh.github.io/amazon/images/${ele.imgURL}" alt="">
          <div class="txt-wrap">
            <h3>${ele.title}</h3>
            <ul>
              ${
                ele.desc.map(el => `<li>- ${el}</li>`).join('')
              }
            </ul>
          </div>
        </li>`;
    });
    $$._slideWrap.innerHTML = carouselDataHTML;
  }
}

class Card {
  constructor() {
    this.scale = 1.08;
  }

  setScale () {
    $$._pageNavi.forEach((element) => {
      element.classList.remove('active');
    });
  }

  addActiveLiClass (idx) {
    $$._pageNavi[idx].classList.add('active');
  }
}
