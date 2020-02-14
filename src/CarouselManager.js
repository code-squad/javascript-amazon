class CarouselManager {
  menuCount;
  carouselFirstElement;
  calculatedMarginLeftForArrow;

  constructor(props) {
    this.appendEventListenerToMenuBtn(props.menuBtnElements);
    this.appendEventListenerToArrowBtn(props.arrowBtnElements);
    this.menuCount = props.menuBtnElements.length + 1;
    this.carouselFirstElement = props.carouselFirstElement;
    this.calculatedMarginLeftForArrow = 0; //  캐로우셀의 현재 마진값 상황

    const carouselWrapperNode = document.querySelector('.carousel-wrapper');
    const clonedFirstNode = this.carouselFirstElement.cloneNode();
    const clonedFirstNodeInnerHTML = this.carouselFirstElement.innerHTML;

    clonedFirstNode.innerHTML = clonedFirstNodeInnerHTML;
    carouselWrapperNode.append(clonedFirstNode);
  }

  appendEventListenerToMenuBtn(elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('mouseover', () => {
        elements[i].setAttribute( 'id', 'active' );
        this.calculateCarouselContentStyleToMenu(i); // 하단에 있는 캐로셀의 컨텐츠를 변경하는
      });

      elements[i].addEventListener('mouseout', () => {
        elements[i].setAttribute( 'id', 'inActive' );
      })
    }
  }

  appendEventListenerToArrowBtn(elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', () => {
        this.calculateCarouselContentStyleToArrow(elements[i]);
      })
    }
  }

  calculateCarouselContentStyleToMenu(index) {
    this.calculatedMarginLeftForArrow = -(index * this.carouselFirstElement.offsetWidth);
    // 메뉴를 누르다가 화살표를 누르면 현재상태에서 누른화살표에 따라 이동해야하기 때문에 !

    const calculatedMarginLeft = -(index * this.carouselFirstElement.offsetWidth) + 'px';
    this.carouselFirstElement.style.marginLeft = calculatedMarginLeft;
    requestAnimationFrame(this.calculateCarouselContentStyleToMenu);
  }

  calculateCarouselContentStyleToArrow(element) {
    const maxMarginLeft = -((this.menuCount - 1) * this.carouselFirstElement.offsetWidth); // const -> 변하는 값이 아니다

    if (element.classList[0] === 'left-button') {
      this.calculatedMarginLeftForArrow = (this.calculatedMarginLeftForArrow + this.carouselFirstElement.offsetWidth);
    } else if (element.classList[0] === 'right-button') {
      this.calculatedMarginLeftForArrow = (this.calculatedMarginLeftForArrow - this.carouselFirstElement.offsetWidth);

      if(this.calculatedMarginLeftForArrow === maxMarginLeft) {
        this.carouselFirstElement.removeAttribute('id', 'carousel-first-item');
        this.carouselFirstElement.setAttribute('id', 'change-carousel-first-item');
        this.calculatedMarginLeftForArrow = 0;
        this.carouselFirstElement.style.marginLeft = 0 + 'px';
      }
    }

    this.carouselFirstElement.style.marginLeft = this.calculatedMarginLeftForArrow + 'px'; // 형태변화!
    requestAnimationFrame(this.calculateCarouselContentStyleToArrow);
  }
}