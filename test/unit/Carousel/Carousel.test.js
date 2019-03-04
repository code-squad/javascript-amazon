import { Carousel } from '../../../src/js/components/Carousel/Carousel.js';

describe("Carousel", ()=>{
    'use strict';
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", () => {
            expect(() => {
                Carousel()
            }).toThrow();
        })
        it("'new' 키워드로 호출되었으면 예외를 던지지 않는다.", () => {
            expect(
                new Carousel()
            ).toBeInstanceOf(Carousel);
        })
    })
    const carousel = new Carousel();

})