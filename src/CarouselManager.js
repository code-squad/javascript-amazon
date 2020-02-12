class CarouselManager {
  constructor(props) {
    this.appendEventListenerToMenuBtn(props.menuButtonElements);
    this.carouselFirstElement = props.carouselFirstElement;
  }

  appendEventListenerToMenuBtn(elements) {
    for(let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', () => {
        this.calculateMenuStyle(i);
      })
    }
  }

  appendEventListenerToArrowBtn() {

  }

  calculateMenuStyle(index) {
    const calculatedMarginLeft = -(index * this.carouselFirstElement.offsetWidth) + 'px';
    this.carouselFirstElement.style.marginLeft = calculatedMarginLeft;
  }
}