import PlansLayer from '../src/js/PlansLayer.js';

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

jest
  .dontMock('fs');

describe ("Plans layer", () => {
  let layer;
  const windowIntersectionObserver = window.IntersectionObserver;

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
      this.observe = jest.fn()
      this.unobserve = jest.fn()
    })
    layer = new PlansLayer();
  });

  describe ("layer는", () => {
    it ("PlansLayer로부터 생성된 객체이다.", () => {
      expect(layer).toBeInstanceOf(PlansLayer);
    })
    it ("생성될 때 IntersectionObserver으로 객체를 생성하고 초기화한다.", () => {
      expect(layer.io).toBeInstanceOf(IntersectionObserver);
    })
  })

  describe ("prime button이 viewport 내에", () => {
    let entry, plans;
    beforeEach(() => {
      entry = {};
      plans = document.querySelector('.plans');
    })
    it ("있으면 'plans--scroll' 클래스를 제거한다.", () => {
      entry.isIntersecting = true;
      layer.togglePlansNav(entry, plans)
      expect(plans.classList.contains('plans--scroll')).toBeFalsy();
    })
    it ("없으면 'plans--scroll' 클래스를 추가한다.", () => {
      entry = {};
      entry.isIntersecting = false;
      layer.togglePlansNav(entry, plans)
      expect(plans.classList.contains('plans--scroll')).toBeTruthy();
    })
  })

  describe ("init 함수를 호출하면", () => {
    beforeEach(() => {
      layer.setClickEvent = jest.fn();
      layer.init();
    })
    it ("IntersectionObserver객체 io의 관찰을 시작한다.", () => {
      expect(layer.io.observe).toHaveBeenCalled();
    })
    it ("setClickEvent 함수가 실행된다.", () => {
      expect(layer.setClickEvent).toHaveBeenCalled();
    })
  })

  describe ("클릭 이벤트", () => {
    let evt;
    beforeEach(() => {
      evt = {};
      layer.showPlans = jest.fn();
      layer.closePlans = jest.fn();
    })
    it ("plans-header__btn 클래스를 가진 버튼을 클릭하면, showPlans 함수를 호출한다.", () => {
      evt.target = document.querySelector('.plans-header__btn');
      layer.callClickEvent(evt);
      expect(layer.showPlans).toHaveBeenCalled();
    })

    it ("plans-content__btn--close 클래스를 가진 버튼을 클릭하면, closePlans 함수를 호출한다.", () => {
      evt.target = document.querySelector('.plans-content__btn--close');
      layer.callClickEvent(evt);
      expect(layer.closePlans).toHaveBeenCalled();
    })

    it ("plans-content__btn--close-icon 클래스를 가진 버튼을 클릭하면, closePlans 함수를 호출한다.", () => {
      evt.target = document.querySelector('.plans-content__btn--close-icon');
      layer.callClickEvent(evt);
      expect(layer.closePlans).toHaveBeenCalled();
    })
  })

  describe ("showPlans 함수를 실행하면", () => {
    beforeEach(() => {
      layer.init();
      layer.showPlans();
    })
    it ("IntersectionObserver객체 io의 관찰을 멈춘다.", () => {
      expect(layer.io.unobserve).toHaveBeenCalled();
    })
  })
})
