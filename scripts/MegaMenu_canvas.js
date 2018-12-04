const setting = {
  canvasWidth: 800,
  canvasHeight: 520,

  // canvas offset for detail area to draw triangle path
  detailStartX: 190, // width of top level megaMenu nav
  detailYTop: 0,
  detailYBottom: 520,
};

export default class CanvasPath {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.context = canvasEl.getContext('2d');
    this.canvas.width = setting.canvasWidth;
    this.canvas.height = setting.canvasHeight;
  }

  drawTriangularPath({ point1, point2, point3 }) {
    this.context.beginPath();
    this.context.moveTo(...point1);
    this.context.lineTo(...point2);
    this.context.lineTo(...point3);
    this.context.closePath();

    this.context.stroke();
    return this.context;
  }

  drawThresholdToDetail(cursorX, cursorY) {
    return this.drawTriangularPath({
      point1: [setting.detailStartX, setting.detailYTop],
      point2: [setting.detailStartX, setting.detailYBottom],
      point3: [cursorX, cursorY],
    });
  }

  isPointInPath(pointX, pointY) {
    return this.context.isPointInPath(pointX, pointY);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }
}
