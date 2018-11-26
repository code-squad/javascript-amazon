export default class LayerManager {
  constructor(ele) {
    this.ele = ele;
  }

  init() {
    const layer = {
      dimmedEle: this.ele.dimmedLayer,
      titleEle: this.ele.titleLayer,
      listEle: this.ele.departmentListLayer,
      outerEle: this.ele.outerLayer,
      contentEle: this.ele.contentLayer,
    }
    let timer = null;
    this.checkPointInTriangle(layer);
    this.setCloseListLayer(layer, timer);
    this.setOpenListLayer(layer, timer);
  }

  setOpenListLayer(layer, timer) {
    layer.titleEle.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        layer.listEle.setAttribute("style", "display: block;");
        layer.dimmedEle.setAttribute("style", "opacity: 0.6; height: 100%;");
      }, 350);
    });
  }
  setCloseListLayer(layer, timer) {
    layer.titleEle.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      layer.listEle.setAttribute("style", "opacity: 0;");
      layer.dimmedEle.setAttribute("style", "opacity: 0;");
    });
  }

  checkPointInTriangle(layer) {

    // get MousePosition Point(X,Y)  

    // layer.outerEle.addEventListener("mousemove", (eContent) => {
    // let posClient = {
    //   mouseP: {
    //     x: eContent.clientX,
    //     y: eContent.clientY,
    //   },
    //   startP: {
    //     x: 0,
    //     y: 0,
    //   },
    //   fixP0: {
    //     x: 392,
    //     y: 152,
    //   },
    //   fixP1: {
    //     x: 392,
    //     y: 550,
    //   },
    // }

    // mouseMove시 X,Y 값이 다를 때 startPoint 지정
    // let setStartPoint = this.getDelayStartPoint(200, eContent, posClient.startP);
    // boolTriangle = this.getPointInTriangle(posClient.mouseP, setStartPoint, posClient.fixP1, posClient.fixP0);

    // console.log(`${posClient.mouseP.x}: StartPoint X축, ${posClient.mouseP.y}: StartPoint Y축`);
    // console.log(`${posClient.startP.x}: setPoint X축, ${posClient.startP.y}: setPoint Y축`);

    // });

    let posClient = {
      mouseP: {
        x: 0,
        y: 0,
      },
      fixP0: {
        x: 392,
        y: 152,
      },
      fixP1: {
        x: 392,
        y: 550,
      },
    }
    layer.outerEle.addEventListener("mousemove", (e) => {
      posClient.mouseP.x = e.clientX;
      posClient.mouseP.y = e.clientY;
      console.log(`${posClient.mouseP.x} 실시간마우스X ${posClient.mouseP.y} 실시간마우스Y`);
    })

    let boolTriangle = false;
    layer.outerEle.addEventListener("mousemove", this.debounce(200, (e) => {
      let startPoint = {
        x: e.clientX,
        y: e.clientY,
      }
      boolTriangle = this.getPointInTriangle(posClient.mouseP, startPoint, posClient.fixP1, posClient.fixP0);
      console.log(`${boolTriangle} boolean삼각형`);
      console.log(`${startPoint.x} debounce마우스X ${startPoint.y} debounce마우스Y`);
      return boolTriangle;
    }));


    // set Element Show / Hidden
    layer.contentEle.forEach((e) => {
      this.setShowInnerListLayer(e);
      this.setHiddenInnerListLayer(e);
    });
  }

  setShowInnerListLayer(e) {
    e.addEventListener("mouseenter", (eContent) => {
      this.setShowAttText(eContent);
      this.setShowAttribute(eContent);
    });
  }

  setHiddenInnerListLayer(e) {
    e.addEventListener("mouseleave", (eContent) => {
      this.setHiddenAttText(eContent);
      this.setHiddenAttribute(eContent);
    });
  }

  debounce(delay, fn) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }

  setShowAttText(e) {
    e.target.children[0].setAttribute("style", "color: #e47911;");
    e.target.children[1].setAttribute("style", "color: #bbb;");
  }

  setHiddenAttText(e) {
    e.target.children[0].removeAttribute("style");
    e.target.children[1].removeAttribute("style");
  }

  setShowAttribute(e) {
    // e.target.lastElementChild.setAttribute("style", "opacity: 100; width: 400px;");
    e.target.lastElementChild.setAttribute("style", "display: block;");
  }

  setHiddenAttribute(e) {
    e.target.lastElementChild.removeAttribute("style");
  }

  // triangle Algorithm
  getPointInTriangle(p, p0, p1, p2) {
    let result = (((p1.y - p0.y) * (p.x - p0.x) - (p1.x - p0.x) * (p.y - p0.y)) || ((p2.y - p1.y) * (p.x - p1.x) - (p2.x - p1.x) * (p.y - p1.y)) || ((p0.y - p2.y) * (p.x - p2.x) - (p0.x - p2.x) * (p.y - p2.y))) >= 0;
    return result;
  }
}