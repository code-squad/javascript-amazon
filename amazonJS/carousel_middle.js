class Carousel_middle {
  constructor(playBool, container, right, left, module) {
    this.module = module;
    this.playBool = playBool;
    this.container = container;
    this.right = right;
    this.left = left;
    this.init();
  }

  init() {
    this.module.getAjax(this.handler.bind(this), `./jsonData/data.json`);
  }

  partDivider() {
    const playBool = false;
    const container = this.module.qs(".middle-body-carousel-list");
    const right = this.module.qs(".middle-body-carousel-right-button");
    const left = this.module.qs(".middle-body-carousel-left-button");
    return [playBool, container, right, left];
  }

  handler(parsedObj) {
    //롸잇, 레프트
    const partArr = this.partDivider();
    this.parsedObj = parsedObj;
    partArr[2].addEventListener("click", this.moveRight);
    partArr[3].addEventListener("click", this.moveLeft);
  }

  moveRight() {
    //오른쪽으로 움직이는 부분
    const partArr = this.partDivider().bind(this);
    console.log("hi@");
    if (partArr[0]) return;
    partArr[0] = true;
    this.parsedObj.backgroundUrl.unshift(parsedObj.backgroundUrl.pop());
    //shifting
    partArr[1].style.transform = "translateX(230px)";
    partArr[1].addEventListener("transitionend", () => {
      this.parsedObj.backgroundUrl.forEach((v, i) => {
        const part = this.module.qs(`.index${i}`);
        part.style = `background-image:url(${v})`;
      });
      partArr[1].style.transition = "all 0s";
      partArr[1].style.transform = "translateX(0px)";
      partArr[0] = false;
    });
    partArr[1].style.transition = "all 0.5s";
  }

  moveLeft(container) {
    //왼쪽으로 움직이는 부분
  }
}

export { Carousel_middle };
