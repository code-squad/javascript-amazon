import { Helpers } from '../../../src/js/Helpers/Helpers.js';

describe("helpers", ()=>{
    'use strict';
    const helpers = new Helpers();
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

    describe('addClass(element, classname)', () => {
        const displayElement = document.createElement("div");
        let classNumber = displayElement.classList.length;
        const macherNumber = () => classNumber = classNumber + 1;

        afterEach(() => {
            displayElement.remove();    
        });
        it("메소드가 호출되면 해당 엘리먼트에 class가 추가 된다.", () => {
            expect(helpers.addClass(displayElement, 'test').classList.length)
                .toBe(macherNumber());
                
        });
        it("해당 엘리먼트의 클래스와 중복되지 않는 클래스 명만 추가한다.", () => {
            expect(helpers.addClass(displayElement, 'test').classList.length)
                .not.toBe(macherNumber());
        });
        it("첫번째 인자가 HTML 태크가 아니면 예외를 던진다", () => {
            expect(() => helpers.addClass('test', 'test')).toThrow();
        });
    });
    
    describe('removeClass(element, classname)', () => {
        const displayElement = document.createElement("div");
        displayElement.setAttribute("class", "test");
        let classNumber = displayElement.classList.length;
        const macherNumber = () => classNumber = classNumber - 1;

        afterEach(() => {
            displayElement.remove();    
        });
        it("메소드가 호출되면 해당 엘리먼트에 class가 제거 된다.", () => {
            expect(helpers.removeClass(displayElement, 'test').classList.length)
                .toBe(macherNumber());
        });

        it("첫번째 인자가 HTML 태크가 아니면 예외를 던진다", () => {
            expect(() => helpers.removeClass('test', 'test')).toThrow()
        });
    });
});
