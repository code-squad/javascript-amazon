import { Plans } from '../../../src/js/components/Plans/Plans.js';
import { Helpers } from '../../../src/js/util/Helpers.js';
import { render } from '../testHelpers';
describe("Plans", () => {
    'use strict';
    const helpers = new Helpers();
    const plans = new Plans(helpers);
    let spy, dom, els, el, target, eachCoverEls, currentTop, className;
    
    describe("생성", () => {
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
    })
    beforeAll(() => {
        dom = render(`
            <nav data-testid="nav">
                <div data-testid="nav-cover">
                    <div data-testid="nav-front">
                        <div data-testid="open"></div>
                    </div>
                </div>
                <div data-testid="nav-cover">
                    <div data-testid="nav-submit">
                        <div data-testid="close"></div>
                        <div data-testid="close"></div>
                    </div>
                </div>
            </nav>
            <div data-testid="about"></div>
            <div data-testid="test"></div>
        `);
        els ={
            header: dom.$getTestEl('header'),
            stickyNav: dom.$getTestEl('nav'),
            stickyNavCover: dom.$getTestElAll('nav-cover'),
            open: dom.$getTestEl("open"),
            close: dom.$getTestElAll("close"),
        }
        el = dom.$getTestEl("test");
        className = {
            active: 'active', clicked: 'clicked'
        }
    })
    afterAll(()=>{
        render(``);
    })
    describe("setEvent", () => {
        beforeEach(()=>{
            target = {
                headerBottom: 0,
                fixPoint: 0
            }
            eachCoverEls = [ els.submitCover, els.frontCover ];
        })
        it('이벤트 핸들러를 추가하는 helpers 인스턴스의 on 메소드가 실행된다.', ()=>{
            spy = jest.spyOn(plans.H, "on");
            plans.setEvent(els, target);
            expect(spy).toHaveBeenCalled();
        })
        it("메소드 체이닝이 가능하다.", () => {
            expect(plans.setEvent(els, target)).toBeInstanceOf(Plans);
        })
    })
    describe("controllStickyNav", () => {
        it('currentTop이 target보다 값이 더 크면 helpers 인스턴스의 addClass 메서드가 실행된다.', () => {
            target = 5;
            currentTop = 10;
            spy = jest.spyOn(plans.H, 'addClass');
            plans.controllStickyNav(el, target, currentTop, 'test')
            expect(spy).toHaveBeenCalled();
        })
        it('currentTop이 target보다 값이 더 작으면 helpers 인스턴스의 remove 메서드가 실행된다.', () => {
            target = 10;
            currentTop = 5;
            spy = jest.spyOn(plans.H, 'removeClass');
            plans.controllStickyNav(el, target, currentTop, 'test')
            expect(spy).toHaveBeenCalled();
        })
        it("메소드 체이닝이 가능하다.", () => {
            expect(plans.controllStickyNav(el, 0, 0, 'test')).toBeInstanceOf(Plans);
        })
    })
    describe("DOM", () => {
        it("currentTop이 target보다 크면 class가 추가된다.",() => {
            currentTop = 10;
            target = 5;
            className = 'test'
            plans.controllStickyNav(el, target, currentTop, className);
            expect(el.classList.contains('test')).toBeTruthy();
        })
        it("currentTop이 target보다 작으면 class가 제거된다.",() => {
            currentTop = 5;
            target = 10;
            className = 'test'
            expect(el.classList.contains('test')).toBeTruthy();
            plans.controllStickyNav(el, target, currentTop, className);
            expect(el.classList.contains('test')).toBeFalsy();
        })
    })
})