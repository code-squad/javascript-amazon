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
    window.addEventListener = jest.fn();
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
    layer.togglePlansNav(entry, plans)
    expect(plans.classList.contains('plans--scroll')).toBeFalsy();
  })

  it("prime button이 viewport 내에 없으면 'plans--scroll' 클래스를 추가한다.", () => {
    const entry = {};
    entry.isIntersecting = false;
    const plans = document.querySelector('.plans');
    layer.togglePlansNav(entry, plans)
    expect(plans.classList.contains('plans--scroll')).toBeTruthy();
  })

  it("init 함수를 호출하면 setClickEvent 함수가 실행된다.", () => {
    layer.setClickEvent = jest.fn();
    layer.init();
    expect(layer.setClickEvent).toHaveBeenCalled();
  })

  it("plans-header__btn 클래스를 가진 버튼을 클릭하면, showPlans 함수를 호출한다.", () => {
    const evt = {
      target: document.querySelector('.plans-header__btn')
    }
    layer.showPlans = jest.fn();
    layer.callClickEvent(evt);
    expect(layer.showPlans).toHaveBeenCalled();
  })

  it("plans-content__btn--close 또는 plans-content__btn--close-icon 클래스를 가진 버튼을 클릭하면, closePlans 함수를 호출한다.", () => {
    const evt = {}
    evt.target = document.querySelector('.plans-content__btn--close');
    layer.closePlans = jest.fn();
    layer.callClickEvent(evt);
    expect(layer.closePlans).toHaveBeenCalled();

    evt.target = document.querySelector('.plans-content__btn--close-icon');
    layer.closePlans = jest.fn();
    layer.callClickEvent(evt);
    expect(layer.closePlans).toHaveBeenCalled();
  })
})
