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

  } // 화살표 클릭시 이벤트 발생 // 화살표버튼은 인덱스정보다 필요없음

  settingCarousel(props) {
    [this.carouselList[this.carouselList.length - 1], ...this.carouselList, this.carouselList[0]] // [{..},{..}...{..}] (4 1234 1)
      .forEach((carousel) => this.carouselWrapperElement.appendChild(new Carousel(carousel).render())); // carouselWrapperElement = <div>...</div> 6개들어감

    const leftCarousel = document.querySelector('.card-navigation-details-wrapper'); // 위에서 새로넣은 div들중 한개의 width 630px 샘플 잡음
    this.carouselWrapperElement.style.transform = `translate3d(-${leftCarousel.offsetWidth * (this.currentIndex + 1)}px, 0px, 0px)`; // 4가가려진 처음상태(-630*(0+1)) = -630px
    const menu = document.querySelector('.card-navigation-list-item'); // 첫쨰꺼만 잡아옴..
    menu.style.transform = 'scale(1.2)'; // A메뉴 큰상태로 초기셋

    props.menuBtnElements.forEach((element, index) => element.addEventListener('click', this.calculateCarouselContentStyleToMenu.bind(this, index)));
  // 메뉴버튼 클릭시 이벤트발생
  // foreach (두번쨰 인자는 인덱스) //원래는 두번쨰인자로 arrow function이 들어가지만 arrow function바로 넣는 대신 콜백함수 넣고.bind로 결합해주기 (bind공부하기)!
    props.arrowBtnElements.forEach((element) => element.addEventListener('click', this.calculateCarouselContentStyleToArrow.bind(this, element)));
  }


  calculateCarouselContentStyleToMenu(index) { // (46줄참고) 메뉴버튼 클릭시 오른쪽, 왼쪽 이동수 계산
    const rightCount = index > this.currentIndex ? index - this.currentIndex : this.carouselList.length - this.currentIndex + index; // 새로 메뉴누르면 오른쪽으로 몇칸가야하는지 계산
    const leftCount = index < this.currentIndex ? this.currentIndex - index : this.currentIndex + this.carouselList.length - index; // 새로 메뉴누르면 왼쪽으로 몇칸가야하는지 계산
    const delta = rightCount > leftCount ? -1 : 1; // delta로 이동방향 설정(1 오른쪽이동 -1 왼쪽이동)

    while (this.currentIndex !== index) {
      this.currentIndex += delta;
      this.printCarouselList();  // 최단방향찾았으니 적용할 이동량 계산해서 transform 주는 함수 돌리기
    }

    this.printMenu(index); // 즉 46줄에서
  }

  calculateCarouselContentStyleToArrow(element) {
    if (element.classList[0] === 'left-button') this.currentIndex--;
    else if (element.classList[0] === 'right-button') this.currentIndex++;

    this.printCarouselList();
    this.printMenu(this.currentIndex);
  }

  printCarouselList() { // 적용할 이동량 계산해서 transform 주는 함수
    const leftCarousel = document.querySelector('.card-navigation-details-wrapper');

    this.carouselWrapperElement.style.transition = 'all 0.2s'; // long paper 의 이동속도
    this.carouselWrapperElement.style.transform = `translate3d(-${leftCarousel.offsetWidth * (this.currentIndex + 1)}px, 0px, 0px)`; // long paper 의 이동량

    if (this.currentIndex === -1) { // long paper 에서 carousel 로 보이는 인덱스부분이 *4*12341 일때
      this.currentIndex = this.carouselList.length - 1; // 4123*4*1인덱스로 변경 ( 반대쪽 끝 4로 !)

      setTimeout(() => { // 변경된 인덱스를 setTimeout 적용해서 트릭 걸기!
        this.carouselWrapperElement.style.transition = '0s'; // 속도0초
        this.carouselWrapperElement.style.transform = `translate3d(-${leftCarousel.offsetWidth * (this.currentIndex + 1)}px, 0px, 0px)`; // long paper 에서 carousel 로 보이는 인덱스부분이 4123*4*1 가되게 width값 계산
      }, 201);
    }

    if (this.currentIndex === this.carouselList.length) { // long paper 에서 carousel 로 보이는 인덱스부분이 41234*1* 일때
      this.currentIndex = 0; // 4*1*2341인덱스로 변경 ( 반대쪽 앞 1로 !)

      setTimeout(() => { // 변경된 인덱스를 setTimeout 적용해서 트릭 걸기!
        this.carouselWrapperElement.style.transition = '0s';
        this.carouselWrapperElement.style.transform = `translate3d(-${leftCarousel.offsetWidth * (this.currentIndex + 1)}px, 0px, 0px)`;  // long paper 에서 carousel 로 보이는 인덱스부분이 4*1*2341 가되게 width값 계산
      }, 201);
    }
  }

  printMenu(index) { // 46에서 받은 클릭한 버튼 인덱스를 찾아서 1.2배 확대 (나머지는 기존크기로 두고)
    const menus = document.querySelectorAll('.card-navigation-list-item'); // 모든 메뉴버튼 태그들이 배열로 담긴다.
    menus.forEach((element, i) => {
      element.style.transform = 'scale(1)';

      if (i === index) {
        element.style.transform = 'scale(1.2)';
      }
    });
  }
}
//