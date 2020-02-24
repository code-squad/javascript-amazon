class EventController {
  constructor(carousel, card) {
    this.carousel = carousel;
    this.card = card;
    this.slideIndex = 1;
  }

  setUpDom () {
    const firstSlideClone = $$._slideLi[0].cloneNode(true);
    const lastSlideClone = $$._slideLi[$$._slideLi.length - 1].cloneNode(true);
    $$._slideWrap.prepend(lastSlideClone);
    $$._slideWrap.append(firstSlideClone);

    $$._pageNavi[0].classList.add('active');
  }

  init () {
    this.carousel.render();
    this.setUpDom();
    this.slideMoveHandler();
    this.carousel.setCard(this.card);
  }

  setLoad () {
    $$._pageNavi.forEach((element, idx) => {
      element.addEventListener('click', () => {
        this.card.setScale();
        this.card.addActiveLiClass(idx);
        this.carousel.cardClickRender(idx);
      });
    });

    if(!localStorage.getItem("myJson")) {
      const that = this;
      fetch('./localData.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        localStorage.setItem("myJson", JSON.stringify(myJson));
        that.init();
      });

      return;
    }
    this.init();
  }

  slideMoveHandler () {
    $$._prevBtn.addEventListener('click', () => {
      this.carousel.isPrev = true;
      this.carousel.clickPrevNext();
    });
    $$._nextBtn.addEventListener('click', () => {
      this.carousel.isPrev = false;
      this.carousel.clickPrevNext();
    });
  }
}
