class Carousel_middle {
  constructor(playBool, container, right, left, module) {
    this.module = module;
    this.playBool = playBool;
    this.container = container;
    this.right = right;
    this.left = left;
    this.parsedArr = [];
    this.init();
  }

  init() {
    this.module.getAjax(this.handler.bind(this), `./jsonData/data.json`);
  }

  handler(parsedObj) {
    //롸잇, 레프트
    const backgroundUrlArr = parsedObj.backgroundUrl;
    for (let i = 0; i < backgroundUrlArr.length; i++) {
      this.parsedArr.push(parsedObj["backgroundUrl"][i]);
    }//가져온 데이터 클래스에 넣어버리기
    this.right.addEventListener("click", this.moveRight.bind(this));
    this.left.addEventListener("click", this.moveLeft.bind(this));
  }

  moveRight() {
    //오른쪽으로 움직이는 부분
    if (this.playBool) return;
    this.playBool = true;
    this.parsedArr.unshift(this.parsedArr.pop());
    //shifting
    this.container.style.transform = "translateX(230px)";
    this.container.addEventListener(
      "transitionend",
      this.shuffleArr.bind(this)
    );
    this.container.style.transition = "all 0.5s";
  }

  moveLeft() {
    //왼쪽으로 움직이는 부분
    if (this.playBool) return;
    this.playBool = true;
    this.parsedArr.push(this.parsedArr.shift());
    //shifting
    this.container.style.transform = "translateX(-230px)";
    this.container.addEventListener(
      "transitionend",
      this.shuffleArr.bind(this)
    );
    this.container.style.transition = "all 0.5s";
  }

  shuffleArr() {
    this.parsedArr.forEach((v, i) => {
      const part = this.module.qs(`.index${i}`);
      part.style = `background-image:url(${v})`;
    });
    this.container.style.transition = "all 0s";
    this.container.style.transform = "translateX(0px)";
    this.playBool = false;
  }
}

export { Carousel_middle };
