class Slide {
  constructor() {
    this.currentPosition = -900;
    this.DEFALT_POSITION = 900;
    this.cloneNodeLength = 2;
  }

  setPosition () {
    const isLast = this.currentPosition === -(__.slideLi.length - 1) * this.DEFALT_POSITION;

    if(!this.currentPosition) {
      this.currentPosition = -1 * this.DEFALT_POSITION * (__.slideLi.length - this.cloneNodeLength);
    }

    if(isLast) {
      this.currentPosition = this.DEFALT_POSITION * -1;
    }
  }

  setBeforeMoveEvent () {
    __.slideWrap.style.transition = `all 0.3s ease-in-out`;
    __.slideWrap.style.transform = `translate(${this.currentPosition}px, 0)`;
  }

  setAfterMoveEvent (isTransition) {
    __.slideWrap.style.transition = 'none';
    isTransition = false;
    __.slideWrap.style.transform = `translate(${this.currentPosition}px, 0)`;

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
    __.slideWrap.innerHTML = carouselDataHTML;
  }
}

class Button {
  constructor() {
    this.slideIndex = 1
  }

  clickPrev ({ currentPosition, DEFALT_POSITION }) {
    this.slideIndex--;
    this.setSlideIndex();
    currentPosition += DEFALT_POSITION;

    return currentPosition;
  }

  clickNext ({ currentPosition, DEFALT_POSITION }) {
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
    __.pageNavi.forEach((element) => {
      element.classList.remove('active');
    });
  }

  addActiveLiClass (idx) {
    __.pageNavi[idx].classList.add('active');
  }

  setClickCard ({ clickIndex, slideIndex, currentPosition, DEFALT_POSITION }) {
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
