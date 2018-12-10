import ClassSwitch from './MegaMenu__classSwitch.js';

const setting = {
  canvasWidth: 800,
  canvasHeight: 520,

  // canvas root position to calculate internal coordinate
  canvasTop: 120, // height of page header
  canvasLeft: 190, // width of left margin

  // canvas offset for detail area to draw triangle path
  detailStartX: 190, // width of top level megaMenu nav
  detailYTop: 0,
  detailYBottom: 520,
};

export default class CanvasPath {
  constructor(canvasEl, base, menuListItems, detailSection) {
    this.canvas = canvasEl;
    this.context = canvasEl.getContext('2d');
    this.canvas.width = setting.canvasWidth;
    this.canvas.height = setting.canvasHeight;
    this.cursorHeadingDetail = false;
    this.boundPathTracker = null;
    this.classSwitch = new ClassSwitch(base, menuListItems, detailSection);
  }

  drawTriangularPath({ point1, point2, point3 }) {
    this.context.beginPath();
    this.context.moveTo(...point1);
    this.context.lineTo(...point2);
    this.context.lineTo(...point3);
    this.context.closePath();
  }

  // Draw traingle path as rule of thumb if cursor is heading detail layer
  drawThresholdToDetail(cursorX, cursorY) {
    return this.drawTriangularPath({
      point1: [setting.detailStartX, setting.detailYTop],
      point2: [setting.detailStartX, setting.detailYBottom],
      point3: [cursorX - setting.canvasLeft, cursorY - setting.canvasTop],
    });
  }

  isPointInPath(pointX, pointY) {
    return this.context.isPointInPath(pointX, pointY);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    return true;
  }

  canvasReset() {
    this.clear();
    this.canvas.classList.remove('opened');
    this.removePathTracker(this.boundPathTracker);
    this.boundPathTracker = null;
    this.cursorHeadingDetail = false;
  }

  pathTracker(evt) {
    const [pointX, pointY] = [evt.pageX - setting.canvasLeft, evt.pageY - setting.canvasTop];
    const bPointInPath = this.isPointInPath(pointX, pointY);

    if (bPointInPath) return;

    this.canvasReset();

    // Close menu if cursor went out of menu
    const bCursorOutOfMenu = pointX < 0 || pointY < 0;
    if (bCursorOutOfMenu) {
      this.classSwitch.closeLinkAndDetail();
      this.classSwitch.closeMenu();
    }
  }

  setPathTracker(cursorX, cursorY) {
    this.drawThresholdToDetail(cursorX, cursorY);
    this.boundPathTracker = this.pathTracker.bind(this);
    window.addEventListener('mousemove', this.boundPathTracker);
  }

  removePathTracker(pathTracker) {
    window.removeEventListener('mousemove', pathTracker);
  }
}
