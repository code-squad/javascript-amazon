import { Helpers } from '../../../src/js/util/Helpers.js';
import { render } from '../testHelpers';
describe("helpers", ()=>{
    'use strict';
    const helpers = new Helpers();
    let dom, el, parent, tagName, className;
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", function(){
            expect(() => {
                Helpers()
            }).toThrow();
        });
        it("'new' 키워드로 호출되었으면 예외를 던지지 않는다.", function(){
            expect(
                new Helpers()
            ).toBeInstanceOf(Helpers);
        });
    });
    beforeAll(() => {
        dom = render(`
            <div data-testid="test"></div>
        `);
        el = dom.$getTestEl('test');
    })
    describe('addClass(element, classname)', () => {
        let length;
        beforeEach(()=>{
            length = el.classList.length;
        })
        afterEach(()=>{
            helpers.addClass(el, 'test');
        })
        it("메소드가 호출되면 해당 엘리먼트에 class가 추가 된다.", () => {
            expect(helpers.addClass(el, 'test')[0].classList.length)
                .toBe(length+1);
        });
        it("해당 엘리먼트의 클래스와 중복되지 않는 클래스 명만 추가한다.", () => {
            expect(helpers.addClass(el, 'test')[0].classList.length)
                .toBe(length);
        });
        it("첫번째 인자가 HTML 태크가 아니면 예외를 던진다", () => {
            expect(() => helpers.addClass('test', 'test')).toThrow();
        });
    });

    describe('removeClass(element, classname)', () => {
        it("메소드가 호출되면 해당 엘리먼트에 class가 제거 된다.", () => {
            let length = el.classList.length
            expect(helpers.removeClass(el, 'test')[0].classList.length)
                .toBe(length-1);
        });
        it("첫번째 인자가 HTML 태크가 아니면 예외를 던진다", () => {
            expect(() => helpers.removeClass('test', 'test')).toThrow()
        });
    });
    describe("on(els, event, callback)", () => {
        it("els 인자가 없으면 예외를 던진다.", () => {
            expect(() => helpers.on()).toThrow();
        })
        it("els 인자가 string이면 array로 변환한다.", () => {
            expect(toString.call(helpers.on('window', 'test', ()=> {}))).toBe('[object Array]');
        })
        it("event 인자가 string이 아니면 예외를 던진다.", () => {
            expect(() => toString.call(helpers.on('window', 1, ()=> {}))).toThrow();
        })
        it("callback 인자가 function 아니면 예외를 던진다.", () => {
            expect(() => toString.call(helpers.on('window', 'test', 1))).toThrow();
        })
        it("해당 메소드가 호출되면 엘리먼트에 이벤트가 추가된다.", () => {
            const fnc = jest.fn();
            helpers.on(el, 'click', fnc);
            el.click();
            expect(fnc).toHaveBeenCalled();
        })
    })
    describe("createEl(parent, tagName, className)", () => {
        beforeEach(() => {
            parent = el;
            tagName = 'div';
            className = 'test1';
        })
        it("parent 엘리먼트 내에 새로운 엘리먼트를 추가한다.", () => {
            helpers.createEl(parent, tagName, className);
            expect(el.firstElementChild.tagName).toBe('DIV');
            expect(el.firstElementChild.classList.contains(className)).toBe(true);
        })
    })
    describe("checkType(name, target)", () => {
        it("타입과 target이 같으면 true를 반환한다.", () => {
            expect(helpers.checkType('string', 'test')).toBeTruthy();
        })
        it("타입과 target이 다르면 false를 반환한다.",() => {
            expect(helpers.checkType('string', 1)).toBeFalsy();
        })
    })
});
