export default class LayerManager {
  constructor(layer) {
    this.layer = {
      dimmedEle: layer.dimmedEle,
      titleEle: layer.titleEle,
      listEle: layer.departmentListEle,
      outerEle: layer.outerEle,
      contentEle: layer.contentEle,
    };
    this.boolTriangle = false;
    this.clientXY = {
      mouseP: {
        x: 0,
        y: 0,
      },
      stayMouseP: {
        x: 0,
        y: 0,
        debounceAct: false,
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
  }

  init() {
    this.checkMouseInTriangle(this.layer);
    this.setOpenListLayer(this.layer);
    this.setCloseListLayer(this.layer);
    this.searchInnerListLayer(this.layer);
  }

  setOpenListLayer(layer) {
    layer.titleEle.addEventListener("mouseenter", () => {
      window.setTimeout(() => {
        layer.listEle.setAttribute("style", "display: block;");
        layer.dimmedEle.setAttribute("style", "opacity: 0.6; height: 100%;");
      }, 350);
    });
  }

  setCloseListLayer(layer) {
    layer.titleEle.addEventListener("mouseleave", () => {
      layer.listEle.removeAttribute("style");
      layer.dimmedEle.setAttribute("style", "opacity: 0;");
    });
  }

  checkMouseInTriangle(layer) {


    // get Mouse Position Point(X,Y) & check Mouse Position in Triangle 
    layer.outerEle.addEventListener("mousemove", (mouse) => {
      this.clientXY.mouseP.x = mouse.clientX;
      this.clientXY.mouseP.y = mouse.clientY;
      // console.log(`${this.clientXY.mouseP.x} 실시간마우스X ${this.clientXY.mouseP.y} 실시간마우스Y`);

      if (!this.clientXY.stayMouseP.debounceAct) this.boolTriangle = false;
      else this.boolTriangle = this.boolMouseInTriangle(this.clientXY.mouseP, this.clientXY.stayMouseP, this.clientXY.fixP1, this.clientXY.fixP0);
      console.log(this.boolTriangle, "myTriangle");
    });

    // get Stay Mouse Position Point(X,Y)
    layer.outerEle.addEventListener("mousemove", this.debounce(200, (mouse) => {
      this.clientXY.stayMouseP.x = mouse.clientX;
      this.clientXY.stayMouseP.y = mouse.clientY;
      // if (this.boolTriangle) this.clientXY.stayMouseP.debounceAct = false;
      // else this.clientXY.stayMouseP.debounceAct = true;
      this.clientXY.stayMouseP.debounceAct = true;
      console.log(`${this.clientXY.stayMouseP.x} debounce 마우스 X ${this.clientXY.stayMouseP.y} debounce 마우스 Y`);
    }));

  }

  searchInnerListLayer(layer) {
    layer.outerEle.addEventListener("mouseleave", layer.contentEle.forEach((activeLayer) => this.setHiddenInnerListLayer(activeLayer)));
    layer.contentEle.forEach((activeLayer) => {
      this.setShowInnerListLayer(activeLayer);
      this.setHiddenInnerListLayer(activeLayer);
    });
  }

  setShowInnerListLayer(liElement) {
    liElement.addEventListener("mouseenter", (activeEle) => {
      console.log(this.clientXY.stayMouseP.debounceAct, "debounce 기능 작동")
      this.setShowAttText(activeEle);
      // if (this.boolTriangle && this.clientXY.stayMouseP.debounceAct) return this.deactiveShowListLayer(liElement);
      // else if (!this.clientXY.stayMouseP.debounceAct || !this.boolTriangle) this.setShowAttribute(activeEle);

      if (this.boolTriangle) return this.deactiveShowListLayer(liElement);
      else this.setShowAttribute(activeEle);
    });
  }

  setHiddenInnerListLayer(liElement) {
    liElement.addEventListener("mouseleave", (activeEle) => {
      this.setHiddenAttText(activeEle);
      // if (this.boolTriangle && this.clientXY.stayMouseP.debounceAct) return this.deactiveHiddenListLayer(liElement);
      // else if (!this.clientXY.stayMouseP.debounceAct || !this.boolTriangle) this.setHiddenAttribute(activeEle);
      if (this.boolTriangle) return this.deactiveHiddenListLayer(liElement);
      else this.setHiddenAttribute(activeEle);
    });
  }

  checkTest() {
    const openEle = [...this.layer.contentEle].filter((e) => {
      const activeStyle = e.lastElementChild.getAttribute("style");
      return !!activeStyle;
    });
    return openEle[openEle.length - 1];
  }

  deactiveShowListLayer(liElement) {
    liElement.removeEventListener("mouseenter", (activeEle) => this.setShowAttribute(activeEle));
  }

  deactiveHiddenListLayer(liElement) {
    liElement.removeEventListener("mouseleave", (activeEle) => this.setHiddenAttribute(activeEle));
  }

  setShowAttText(active) {
    active.target.children[0].setAttribute("style", "color: #e47911;");
    active.target.children[1].setAttribute("style", "color: #bbb;");
    active.target.setAttribute("style", "background-color:#eedd");
  }

  setHiddenAttText(active) {
    active.target.children[0].removeAttribute("style");
    active.target.children[1].removeAttribute("style");
    active.target.removeAttribute("style");
  }

  setShowAttribute(active) {
    active.target.lastElementChild.setAttribute("style", "display: block;");
  }

  setHiddenAttribute(active) {
    active.target.lastElementChild.removeAttribute("style");
    this.clientXY.stayMouseP.debounceAct = false;
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

  // triangle Algorithm
  boolMouseInTriangle(p, p0, p1, p2) {
    // 초기값 예외
    const startStayMousePosition = p0.x === 0 && p0.y === 0;
    if (startStayMousePosition) return false;

    // 삼각형 안에 마우스 유무 계산 => true / false 반환 
    let result = (((p1.y - p0.y) * (p.x - p0.x) - (p1.x - p0.x) * (p.y - p0.y)) || ((p2.y - p1.y) * (p.x - p1.x) - (p2.x - p1.x) * (p.y - p1.y)) || ((p0.y - p2.y) * (p.x - p2.x) - (p0.x - p2.x) * (p.y - p2.y))) >= 0;
    return result;
  }
}
