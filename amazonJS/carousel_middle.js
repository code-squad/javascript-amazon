class Carousel_middle {
  constructor(module) {
    this.module = module;
    this.module.getAjax(this.handler, `./jsonData/data.json`);
  }

  handler(parsedObj) {
    //롸잇, 레프트
    const playBool = false;
    const container = this.module.qs(".middle-body-carousel-list");
    const right = this.module.qs(".middle-body-carousel-right-button");
    const left = this.module.qs(".middle-body-carousel-left-button");
    right.addEventListener(
      "click",
      moveRight(e, parsedObj, container, playBool)
    );
    left.addEventListener("click", moveLeft(e, parsedObj, container, playBool))
  }

  moveRight(e, parsedObj, container, playBool) {
    //오른쪽으로 움직이는 부분
    if (playBool) return;
    playBool = true;
    parsedObj.backgroundUrl.unshift(parsedObj.backgroundUrl.pop());
    //shifting
    container.style.transform = "translateX(230px)";
    container.addEventListener("transitionend", () => {
      parsedObj.backgroundUrl.forEach((v, i) => {
        const part = this.module.qs(`.index${i}`);
        part.style = `background-image:url(${v})`;
      });
      container.style.transition = "all 0s";
      container.style.transform = "translateX(0px)";
      playBool = false;
    });
    container.style.transition = "all 0.5s";
  }

  moveLeft(container) {
    //왼쪽으로 움직이는 부분
  }
}

export { Carousel_middle };