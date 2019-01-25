class carousel {
  constructor(module) {
    this.module = module;
    this.module.getAjax(this.handler, `../jsonData/data.json`);
  }

  handler() {
    //롸잇, 레프트
  }

  moveRight() {
    //오른쪽으로 움직이는 부분
  }

  moveLeft() {
    //왼쪽으로 움직이는 부분
  }

}