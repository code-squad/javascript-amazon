export default class CanvasPath {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.context = canvasEl.getContext('2d');
  }

  createTriangularPath(detailLeft, detailTop, detailBottom, { cursorX, cursorY }) {
    this.context.beginPath();
    this.context.moveTo(detailLeft, detailTop);
    this.context.lineTo(detailLeft, detailBottom);
    this.context.lineTo(cursorX, cursorY);
    this.context.closePath();
    this.context.stroke();

    return this.context;
  }

  isPointInPath(pointX, pointY) {
    return this.context.isPointInPath(pointX, pointY);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }
}
