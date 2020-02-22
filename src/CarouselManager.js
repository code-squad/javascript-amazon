class CarouselManager {
  carouselList = [];
  currentIndex = 0;
  carouselWrapperElement;

  constructor(props) {
    this.carouselWrapperElement = props.carouselWrapperElement;

    if(!localStorage.getItem('carouselJson')) {
      console.log("!!!!!");
      fetch('http://127.0.0.1:8080/')
        .then((response) => response.json())
        .then((carouselList) => {
          this.carouselList = carouselList;
          localStorage.setItem('carouselJson', JSON.stringify(this.carouselList));
          this.settingCarousel(props);
        });
    } else {
      console.log('??????');
      const carouselJson = localStorage.getItem('carouselJson');
      this.carouselList = JSON.parse(carouselJson);
      this.settingCarousel(props);
    }

  }

  settingCarousel(props) {
    [this.carouselList[this.carouselList.length - 1], ...this.carouselList, this.carouselList[0]]
      .forEach((carousel) => this.carouselWrapperElement.appendChild(new Carousel(carousel).render()));

    const leftCarousel = document.querySelector('.card-navigation-details-wrapper');
    this.carouselWrapperElement.style.transform = `translate3d(-${leftCarousel.offsetWidth * (this.currentIndex + 1)}px, 0px, 0px)`;
    const menu = document.querySelector('.card-navigation-list-item');
    menu.style.transform = 'scale(1.2)';

    props.menuBtnElements.forEach((element, index) => element.addEventListener('click', this.calculateCarouselContentStyleToMenu.bind(this, index)));
    props.arrowBtnElements.forEach((element) => element.addEventListener('click', this.calculateCarouselContentStyleToArrow.bind(this, element)));
  }


  calculateCarouselContentStyleToMenu(index) {
    const rightCount = index > this.currentIndex ? index - this.currentIndex : this.carouselList.length - this.currentIndex + index;
    const leftCount = index < this.currentIndex ? this.currentIndex - index : this.currentIndex + this.carouselList.length - index;
    const delta = rightCount > leftCount ? -1 : 1;

    while (this.currentIndex !== index) {
      this.currentIndex += delta;
      this.printCarouselList();
    }

    this.printMenu(index);
  }

  calculateCarouselContentStyleToArrow(element) {
    if (element.classList[0] === 'left-button') this.currentIndex--;
    else if (element.classList[0] === 'right-button') this.currentIndex++;

    this.printCarouselList();
    this.printMenu(this.currentIndex);
  }

  printCarouselList() {
    const leftCarousel = document.querySelector('.card-navigation-details-wrapper');

    this.carouselWrapperElement.style.transition = 'all 0.2s';
    this.carouselWrapperElement.style.transform = `translate3d(-${leftCarousel.offsetWidth * (this.currentIndex + 1)}px, 0px, 0px)`;

    if (this.currentIndex === -1) {
      this.currentIndex = this.carouselList.length - 1;

      setTimeout(() => {
        this.carouselWrapperElement.style.transition = '0s';
        this.carouselWrapperElement.style.transform = `translate3d(-${leftCarousel.offsetWidth * (this.currentIndex + 1)}px, 0px, 0px)`;
      }, 201);
    }

    if (this.currentIndex === this.carouselList.length) {
      this.currentIndex = 0;

      setTimeout(() => {
        this.carouselWrapperElement.style.transition = '0s';
        this.carouselWrapperElement.style.transform = `translate3d(-${leftCarousel.offsetWidth * (this.currentIndex + 1)}px, 0px, 0px)`;
      }, 201);
    }
  }

  printMenu(index) {
    const menus = document.querySelectorAll('.card-navigation-list-item');
    menus.forEach((element, i) => {
      element.style.transform = 'scale(1)';

      if (i === index) {
        element.style.transform = 'scale(1.2)';
      }
    });
  }
}
