export default class RAFAction {
  constructor() {
    this.RAFId = null;
  }

  animate(callback) {
    this.RAFId = requestAnimationFrame(callback);
  }

  stop() {
    cancelAnimationFrame(this.RAFId);
  }
}
