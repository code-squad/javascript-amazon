import { Plans } from '../../../src/js/Plans/Plans.js';

describe("Plans", () => {
    'use strict';
    const plans = new Plans();

    it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", function(){
        expect(() => {
            Plans()
        }).toThrow();
    })
    it("'new' 키워드로 호출되었으면 예외를 던지지 않는다.", function(){
        expect(
            new Plans()
        ).toBeInstanceOf(Plans);
    })

    describe("open()", () => {
    })
    describe("close()", () => {
    })
})