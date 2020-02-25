class Slide {
  constructor() {
    this.currentPosition = -900;
    this.DEFALT_POSITION = 900;
    this.cloneNodeLength = 2;
    this.slideIndex = 1;
  }

  setPosition () {
    const isLast = this.currentPosition === -($$._slideLi.length - 1) * this.DEFALT_POSITION;

    if(!this.currentPosition) {
      this.currentPosition = -1 * this.DEFALT_POSITION * ($$._slideLi.length - this.cloneNodeLength);
    }

    if(isLast) {
      this.currentPosition = this.DEFALT_POSITION * -1;
    }
  }

  setBeforeMoveEvent () {
    $$._slideWrap.style.transition = `all 0.3s ease-in-out`;
    $$._slideWrap.style.transform = `translate(${this.currentPosition}px, 0)`;
  }

  setAfterMoveEvent (isTransition) {
    $$._slideWrap.style.transition = 'none';
    isTransition = false;
    $$._slideWrap.style.transform = `translate(${this.currentPosition}px, 0)`;

    return isTransition;
  }

  render () {
    let carouselDataHTML = '';
    let cardData = localStorage.getItem("cardList");

    JSON.parse(cardData).cardList.forEach((ele) => {
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

class Button {
  constructor() {
    this.slideIndex = 1
  }

  clickPrev (opsition) {
    let { currentPosition, DEFALT_POSITION } = opsition;
    this.slideIndex--;
    this.setSlideIndex();
    currentPosition += DEFALT_POSITION;

    return currentPosition;
  }

  clickNext (opsition) {
    let { currentPosition, DEFALT_POSITION } = opsition;
    this.slideIndex++;
    this.setSlideIndex();
    currentPosition -= DEFALT_POSITION;

    return currentPosition;
  }

  setSlideIndex () {
    if(!this.slideIndex) {
      this.slideIndex = 4;
    }else if(this.slideIndex > 4) {
      this.slideIndex = 1;
    }
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

  setClickCard (options) {
    let { clickIndex, slideIndex, currentPosition, DEFALT_POSITION } = options;
    let beforeIdx = slideIndex - 1;

    if(beforeIdx > clickIndex) {
      currentPosition += DEFALT_POSITION * (beforeIdx - clickIndex);
      slideIndex = clickIndex + 1;
    }else if(beforeIdx < clickIndex) {
      currentPosition -= DEFALT_POSITION * (clickIndex - beforeIdx);
      slideIndex = clickIndex + 1;
    }

    return [currentPosition, slideIndex];
  }
}
