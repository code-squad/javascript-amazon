import { Plans } from '../../../src/js/Plans/Plans.js';
import { Helpers } from '../../../src/js/Helpers/Helpers.js';

describe("Plans", () => {
    'use strict';
    const plans = new Plans(new Helpers());

    it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", () => {
        expect(() => {
            Plans()
        }).toThrow();
    })
    it("'new' 키워드로 호출되었으면 예외를 던지지 않는다.", () => {
        expect(
            new Plans()
        ).toBeInstanceOf(Plans);
    })

    describe("showStickyNav(target)", () => {
        it("조건식을 통과하지 않으면 콜백이 실행되지 않는다.", () => {
            const displayElement = document.createElement("div");
            const spy = jest.spyOn(plans.helpers, 'addClass');
            plans.showStickNav(displayElement, -1, 0);
            expect(spy).not.toHaveBeenCalled();
        })
        it("조건식을 통과해야 콜백 함수가 실행된다.", () => {
            const displayElement = document.createElement("div");
            const spy = jest.spyOn(plans.helpers, 'addClass');
            plans.showStickNav(displayElement, 1, 0);
            expect(spy).toHaveBeenCalled();
        })
    })
    describe("hideStickyNav(target)", () => {
        it("조건식을 통과하지 않으면 콜백이 실행되지 않는다.", () => {
            const displayElement = document.createElement("div");
            const spy = jest.spyOn(plans.helpers, 'removeClass');
            plans.hideStickyNav(displayElement, 1, 0);
            expect(spy).not.toHaveBeenCalled();
        })
        it("조건식을 통과해야 콜백 함수가 실행된다.", () => {
            const displayElement = document.createElement("div");
            const spy = jest.spyOn(plans.helpers, 'removeClass');
            plans.hideStickyNav(displayElement, -1, 0);
            expect(spy).toHaveBeenCalled();
        })
    })
    describe("setEvent()", () => {
        it("element에 스크롤 이벤트를 추가한다.", () => {
            const displayElement = document.createElement("div");
            const mock = jest.fn();
            const setEvent = plans.setEvent("scroll", displayElement, mock);
            const check = getEventListeners(displayElement);
            expect(getEventListeners(setEvent)).toBe(check)

        })
    })
})