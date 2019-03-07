import { Carousel } from '../../../src/js/components/Carousel/Carousel.js';
import { render } from '../testHelpers';

describe("Carousel", ()=>{
    'use strict';
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", () => {
            expect(() => {
                Carousel()
            }).toThrow();
        })
        it("delay옵션을 설정하고 'new' 키워드로 호출되었으면 예외를 던지지 않는다.", () => {
            expect(
                new Carousel({delay: 3000})
            ).toBeInstanceOf(Carousel);
        })
    })
    const carousel = new Carousel({delay:3000});
    let spy, dom, container, slides;

    beforeAll(() => {
        dom = render(`
            <ul data-testid="exploreVideo">

            </ul>
        `);
        container = dom.$getTestEl("exploreVideo");
    });
    describe("runAutoMove(slides)", () => {
        jest.useFakeTimers();
        beforeEach(()=>{
            slides = [container];
            carousel.runAutoMove(slides);
        })
        it("재귀적으로 호출된다.", () => {
            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
        })
        it("controlSlides 콜백 메소드가 호출된다.", () => {
            spy = jest.spyOn(carousel, "controlSlides");
            carousel.runAutoMove(slides);
            expect(spy).toHaveBeenCalled();
        })
    })
})