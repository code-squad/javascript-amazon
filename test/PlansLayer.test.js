import PlansLayer from '../src/js/PlansLayer.js';

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

jest
  .dontMock('fs');

describe("Plans layer", () => {
  let layer;
  const windowIntersectionObserver = window.IntersectionObserver;
  const observe = jest.fn();

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  })

  afterEach(() => {
    jest.resetModules();
  })

  beforeAll(() => {
    const map = {};
    window.addEventListener = jest.fn(function (event, cb) {
      map[event] = cb;
    });
    window.IntersectionObserver = jest.fn(function () {
      this.observe = observe
    })
    layer = new PlansLayer();
  });

  it("layer는 PlansLayer로부터 생성된 객체이다.", () => {
    expect(layer).toBeInstanceOf(PlansLayer);
  })

  it("layer 객체는 생성될 때 IntersectionObserver으로 객체를 생성하고 초기화한다.", () => {
    expect(layer.io).toBeInstanceOf(IntersectionObserver);
  })

  it("init 함수를 호출하면 IntersectionObserver의 관찰을 시작한다.", () => {
    layer.init();
    expect(layer.io.observe).toHaveBeenCalled();
  })

  it("prime button이 viewport 내에 있으면 'plans--scroll' 클래스를 제거한다.", () => {
    const entry = {};
    entry.isIntersecting = true;
    const plans = document.querySelector('.plans');
    layer.togglePlansClass(entry, plans)
    expect(plans.classList.contains('plans--scroll')).toBeFalsy();
  })

  it("prime button이 viewport 내에 없으면 'plans--scroll' 클래스를 제거한다.", () => {
    const entry = {};
    entry.isIntersecting = false;
    const plans = document.querySelector('.plans');
    layer.togglePlansClass(entry, plans)
    expect(plans.classList.contains('plans--scroll')).toBeTruthy();
  })
})
