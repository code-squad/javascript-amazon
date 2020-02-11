class CarouselManager {
  constructor(props) {
    // todo: props로 menuButtonElements DOM들을 받았지, 그 DOM들을 돌면서 이벤트리스너를 붙여줄거야.
    this.appendEventListenerToMenuBtn(props.menuButtonElements);
    this.carouselFirstElement = props.carouselFirstElement;
    // todo: props로 arrowButtonElements DOM들을 받았지, 그 DOM들을 돌면서 이벤트리스너를 붙여줄거야.
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