class Controller {
  constructor({ carouselView, navigationView, animationTime }) {
    this.carouselView = carouselView;
    this.navigationView = navigationView;
    this.countOfCards = undefined;
    this.currentIndex = 0;
    this.previousIndex = undefined;
    this.animationTime = animationTime;
  }

  async init(dataURL) {
    const response = await fetch(dataURL);
    const data = await response.json();
    this.countOfCards = data.length;
    this.currentIndex = this.makeRandomIndex();
    this.carouselView.render(data);
    this.navigationView.render(data);
    this.carouselView.drawCardPosition(this.currentIndex);
    this.navigationView.drawCurrentNavItem(this.currentIndex);
    this.registerEvents();
  }

  registerEvents() {
    this.carouselView.cardList.addEventListener("click", e => {
      if (e.target.tagName === "A") this.carouselViewClickHandler(e);
    });

    this.navigationView.navbar.addEventListener("click", e => {
      const {
        target: {
          tagName,
          dataset: { idx }
        }
      } = e;
      if (tagName === "LI") this.navItemClickHandler(idx);
    });
  }

  carouselViewClickHandler(event) {
    const {
      target: {
        dataset: { direction }
      }
    } = event;
    event.preventDefault();
    this.changeIndexByCarousel(direction);
    this.carouselView.drawCardPosition(this.currentIndex, this.animationTime);
    this.navigationView.drawCurrentNavItem(
      this.currentIndex,
      this.previousIndex
    );
  }
  navItemClickHandler(idx) {
    this.changeIndexByNav(idx);
    this.navigationView.drawCurrentNavItem(
      this.currentIndex,
      this.previousIndex
    );
    this.carouselView.transformCard(this.currentIndex, this.previousIndex);
  }
  changeIndexByNav(idx) {
    this.previousIndex = this.currentIndex;
    this.currentIndex = idx;
  }

  changeIndexByCarousel(direction) {
    this.previousIndex = this.currentIndex;
    let index =
      direction === "left" ? this.currentIndex - 1 : this.currentIndex + 1;
    if (index < 0) index += this.countOfCards;
    this.currentIndex = this.modCardLength(index);
  }
  modCardLength(number) {
    return number % this.countOfCards;
  }
  makeRandomIndex() {
    return Math.floor(Math.random() * (this.countOfCards - 1));
  }
}

export default Controller;
