// 버그 수정 사항
/*
  1. 중간 상품영역 대각선 이동시 삼각형 알고리즘 on상태에 해당 상하상품 영역 hover기능 작동 X 버그 
  2. 서브메뉴 영역(inner-layer) hover 이후 완전히 나갈시(department 탐색 중단의 경우) 서브메뉴 block off 초기화 필요 
*/

export default class LayerManager {
  constructor(layer) {
    this.layer = {
      dimmedEle: layer.dimmedEle,
      titleEle: layer.titleEle,
      listEle: layer.departmentListEle,
      outerEle: layer.outerEle,
      contentEle: layer.contentEle,
    };
    this.clientXY = {
      moveMouse: {
        x: 0,
        y: 0,
      },
      stayMouse: {
        x: 0,
        y: 0,
      },
      fixPos0: {
        x: 400,
        y: 150,
      },
      fixPos1: {
        x: 400,
        y: 560,
      },
    }
    this.boolTriangle = false;
  }

  init() {
    this.setOpenListLayer();
    this.setCloseListLayer();
    this.searchInnerListLayer();
    this.setTriangleMousePosition();
  }

  // set Display Block Department list Layer, show Delay 350ms
  setOpenListLayer() {
    this.layer.titleEle.addEventListener("mouseenter", () => window.setTimeout(() => this.setDisplayBlock()), 350);
  }

  // set Display None Department list Layer
  setCloseListLayer() {
    this.layer.titleEle.addEventListener("mouseleave", () => this.setDisplayNone());
  }

  setDisplayBlock() {
    this.layer.listEle.setAttribute("style", "display: block;");
    this.layer.dimmedEle.setAttribute("style", "opacity: 0.6; height: 100%;");
  }

  setDisplayNone() {
    this.layer.listEle.removeAttribute("style");
    this.layer.dimmedEle.setAttribute("style", "opacity: 0;");
  }

  // check Mouse Position in Triangle
  checkMouseInTriangle() {
    this.layer.outerEle.addEventListener("mousemove", () => this.boolMouseInTriangle(this.clientXY.moveMouse, this.clientXY.stayMouse, this.clientXY.fixPos1, this.clientXY.fixPos0));
  }

  // Triangle Position Setting
  setTriangleMousePosition() {
    // get Move Mouse Position Point(X,Y)
    this.layer.outerEle.addEventListener("mousemove", (mouse) => this.getMoveMousePosition(mouse));

    // get Stay Mouse Position Point(X,Y) + debounce 300ms
    this.layer.outerEle.addEventListener("mousemove", this.debounce(300, (mouse) => this.getStayMousePosition(mouse)));
  }

  getMoveMousePosition(mouse) {
    this.clientXY.moveMouse.x = mouse.clientX;
    this.clientXY.moveMouse.y = mouse.clientY;
  }

  getStayMousePosition(mouse) {
    this.clientXY.stayMouse.x = mouse.clientX;
    this.clientXY.stayMouse.y = mouse.clientY;
  }

  // search Active <li> element Layer
  searchInnerListLayer() {
    this.layer.contentEle.forEach((activeLayer) => {
      this.setShowInnerListLayer(activeLayer);
      this.setHiddenInnerListLayer(activeLayer);
    });
  }

  // Active <li> Child Element Display Show(=block) 
  setShowInnerListLayer(liElement) {
    liElement.addEventListener("mouseenter", (activeEle) => {
      this.setShowAttText(activeEle);

      // deactive Element Display Show
      if (this.checkSlope(this.clientXY.stayMouse, this.clientXY.moveMouse)) {
        if (this.checkMouseInTriangle) return activeEle.preventDefault();
        else this.resetStayMousePosition;
      }
      else this.setShowAttribute(activeEle);
    });
  }

  // Active <li> Child Element Display None(=Hidden)
  setHiddenInnerListLayer(liElement) {
    liElement.addEventListener("mouseleave", (activeEle) => {
      this.setHiddenAttText(activeEle);

      // deactive Element Display Hidden
      if (this.checkSlope(this.clientXY.stayMouse, this.clientXY.moveMouse)) {
        if (this.checkMouseInTriangle) return activeEle.preventDefault();
        else this.resetStayMousePosition;
      }
      else this.setHiddenAttribute(activeEle);
    });
  }

  // Setting Display Dimmed Text 
  setShowAttText(active) {
    this.setAttributeColorText(active);
    this.setAttributeColorArrow(active);
    this.setAttributeDimmedBlock(active);
  }

  // Setting Display Remove Dimmed Text 
  setHiddenAttText(active) {
    this.setRemoveColorText(active);
    this.setRemoveColorArrow(active);
    this.setRemoveDimmedBlock(active);
  }

  setAttributeColorText(active) {
    active.target.children[0].setAttribute("style", "color: #e47911;");
  }

  setAttributeColorArrow(active) {
    active.target.children[1].setAttribute("style", "color: #bbb;");
  }

  setAttributeDimmedBlock(active) {
    active.target.setAttribute("style", "background-color:#eedd");
  }

  setRemoveColorText(active) {
    active.target.children[0].removeAttribute("style");
  }
  setRemoveColorArrow(active) {
    active.target.children[1].removeAttribute("style");
  }

  setRemoveDimmedBlock(active) {
    active.target.removeAttribute("style");
  }

  setShowAttribute(active) {
    active.target.lastElementChild.setAttribute("style", "display: block;");
  }

  setHiddenAttribute(active) {
    active.target.lastElementChild.removeAttribute("style");
    this.resetStayMousePosition;
  }

  resetStayMousePosition() {
    this.clientXY.stayMouse.x = 0;
    this.clientXY.stayMouse.y = 0;
  }

  // debouncing timer 300m
  debounce(delay, fn) {
    let timerId = null;
    return function (...args) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }

  // triangle Algorithm - return: true / false
  boolMouseInTriangle(p, p0, p1, p2) {
    // 초기값 예외
    const startStayMousePosition = (p0.x === 0 && p0.y === 0);
    if (startStayMousePosition) return this.boolTriangle = false;

    // 삼각형 안에 마우스 유무 계산 => true / false 반환 
    this.boolTriangle = (((p1.y - p0.y) * (p.x - p0.x) - (p1.x - p0.x) * (p.y - p0.y)) || ((p2.y - p1.y) * (p.x - p1.x) - (p2.x - p1.x) * (p.y - p1.y)) || ((p0.y - p2.y) * (p.x - p2.x) - (p0.x - p2.x) * (p.y - p2.y))) >= 0;
    return this.boolTriangle;
  }

  // calculate slope
  checkSlope(stayMouse, moveMouse) {
    if (stayMouse.x === 0 && stayMouse.y === 0) return false;
    const degree = (Math.atan2(moveMouse.y - stayMouse.y, moveMouse.x - stayMouse.x) * 180) / Math.PI;
    const mouseAngle = (degree <= 70 && degree >= 0 || degree >= -70 && degree <= 0) ? true : false;
    return mouseAngle;
  }
}
