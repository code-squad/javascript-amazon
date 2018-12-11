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
      mouseP: {
        x: 0,
        y: 0,
      },
      stayMouseP: {
        x: 0,
        y: 0,
      },
      fixP0: {
        x: 400,
        y: 150,
      },
      fixP1: {
        x: 400,
        y: 560,
      },
    }
    this.boolTriangle = false;
  }

  init() {
    this.checkMouseInTriangle();
    this.setOpenListLayer();
    this.setCloseListLayer();
    this.searchInnerListLayer();
    this.setTriangleMousePosition();
    this.setCloseInnerListLayer();
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

  setCloseInnerListLayer() {
    this.layer.outerEle.addEventListener("mouseleave", this.searchInnerListLayer());
  }

  // check Mouse Position in Triangle
  checkMouseInTriangle() {
    this.layer.outerEle.addEventListener("mousemove", () => this.boolMouseInTriangle(this.clientXY.mouseP, this.clientXY.stayMouseP, this.clientXY.fixP1, this.clientXY.fixP0));
  }

  // Triangle Position Setting
  setTriangleMousePosition() {
    // get Move Mouse Position Point(X,Y)
    this.layer.outerEle.addEventListener("mousemove", (mouse) => this.getMoveMousePosition(mouse));

    // get Stay Mouse Position Point(X,Y) + debounce 200ms
    this.layer.outerEle.addEventListener("mousemove", this.debounce(200, (mouse) => this.getStayMousePosition(mouse)));
  }

  getMoveMousePosition(mouse) {
    this.clientXY.mouseP.x = mouse.clientX;
    this.clientXY.mouseP.y = mouse.clientY;
    // console.log(`${this.clientXY.mouseP.x} 실시간마우스X ${this.clientXY.mouseP.y} 실시간마우스Y`);
  }

  getStayMousePosition(mouse) {
    this.clientXY.stayMouseP.x = mouse.clientX;
    this.clientXY.stayMouseP.y = mouse.clientY;
    if (this.boolTriangle) this.resetStayMousePosition;

    console.log(`${this.clientXY.stayMouseP.x} debounce 마우스 X ${this.clientXY.stayMouseP.y} debounce 마우스 Y ${this.clientXY.stayMouseP.debounceAct} 디바운스 작동`);
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
      // console.log(this.clientXY.stayMouseP.debounceAct, "debounce 기능 작동")
      this.setShowAttText(activeEle);

      // deactive Element Display Show
      if (this.boolTriangle) return this.deactiveShowListLayer(liElement);
      // if (this.boolTriangle) return this.debounce(300, this.setShowInnerListLayer(liElement));
      else this.setShowAttribute(activeEle);
    });
  }

  // Active <li> Child Element Display None(=Hidden)
  setHiddenInnerListLayer(liElement) {
    liElement.addEventListener("mouseleave", (activeEle) => {
      this.setHiddenAttText(activeEle);

      // deactive Element Display Hidden
      if (this.boolTriangle) return this.deactiveHiddenListLayer(liElement);
      // if (this.boolTriangle) return this.debounce(300, this.setHiddenInnerListLayer(liElement));
      else this.setHiddenAttribute(activeEle);
    });
  }

  deactiveShowListLayer(liElement) {
    liElement.removeEventListener("mouseenter", (activeEle) => this.setShowAttribute(activeEle));
  }

  deactiveHiddenListLayer(liElement) {
    liElement.removeEventListener("mouseleave", (activeEle) => this.setHiddenAttribute(activeEle));
  }

  // test Method search Active <li> Element Layer
  checkTest() {
    const openEle = [...this.layer.contentEle].filter((e) => {
      const activeStyle = e.lastElementChild.getAttribute("style");
      return !!activeStyle;
    });
    return openEle[openEle.length - 1];
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
    this.clientXY.stayMouseP.x = 0;
    this.clientXY.stayMouseP.y = 0;
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

    console.log(this.boolTriangle, "myTriangle");
    // 삼각형 안에 마우스 유무 계산 => true / false 반환 
    this.boolTriangle = (((p1.y - p0.y) * (p.x - p0.x) - (p1.x - p0.x) * (p.y - p0.y)) || ((p2.y - p1.y) * (p.x - p1.x) - (p2.x - p1.x) * (p.y - p1.y)) || ((p0.y - p2.y) * (p.x - p2.x) - (p0.x - p2.x) * (p.y - p2.y))) >= 0;
    return this.boolTriangle;
  }
}
