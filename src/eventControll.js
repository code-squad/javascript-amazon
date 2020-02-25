class EventController {
  constructor(carousel, card, button) {
    this.carousel = carousel;
    this.card = card;
    this.button = button;
    this.isTransition = false;
  }

  setUpDom () {
    const firstSlideClone = $$._slideLi[0].cloneNode(true);
    const lastSlideClone = $$._slideLi[$$._slideLi.length - 1].cloneNode(true);
    $$._slideWrap.prepend(lastSlideClone);
    $$._slideWrap.append(firstSlideClone);

    $$._pageNavi[0].classList.add('active');
  }

  paintDom () {
    this.carousel.render();
    this.setUpDom();
  }

  setLoad () {
    this.clickCardEventListener();
    this.clickButtonEventListener();
    if(!localStorage.getItem("cardList")) {
      const that = this;
      fetch('./localData.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(cardList) {
        localStorage.setItem("cardList", JSON.stringify(cardList));
        that.paintDom();
      });

      return;
    }
    this.paintDom();
  }

  clickCardEventHandler (idx) {
    this.card.setScale();
    this.card.addActiveLiClass(idx);

    [this.carousel.currentPosition, this.button.slideIndex] = this.card.setClickCard({
      clickIndex : idx,
      slideIndex : this.button.slideIndex,
      currentPosition : this.carousel.currentPosition,
      DEFALT_POSITION : this.carousel.DEFALT_POSITION
    });

    if(!this.isTransition) {
      this.carousel.setBeforeMoveEvent(this.carousel.currentPosition);
      this.carousel.setPosition();
    }
  }

  clickCardEventListener () {
    $$._pageNavi.forEach((element, idx) => {
      element.addEventListener('click', () => this.clickCardEventHandler(idx));
    });
  }

  transitionEndListener () {
    $$._slideWrap.addEventListener('transitionend', () => {
      this.isTransition = this.carousel.setAfterMoveEvent(this.isTransition);
    });
  }

  clickButtonEventHandler (isPrev) {
    const options = {
      currentPosition : this.carousel.currentPosition,
      DEFALT_POSITION : this.carousel.DEFALT_POSITION
    }
    if(!this.isTransition) {
      this.isTransition = true;
      if(isPrev) {
        this.carousel.currentPosition = this.button.clickPrev(options);
      }else {
        this.carousel.currentPosition = this.button.clickNext(options);
      }
      this.carousel.setBeforeMoveEvent(this.currentPosition);
      this.carousel.setPosition();
      this.card.setScale();
      this.card.addActiveLiClass(this.button.slideIndex - 1);
      this.transitionEndListener();
    }
  }

  clickButtonEventListener () {
    $$._prevBtn.addEventListener('click', () => this.clickButtonEventHandler(true));
    $$._nextBtn.addEventListener('click', () => this.clickButtonEventHandler(false));
  }
}
