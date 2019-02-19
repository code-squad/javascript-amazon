import { TypeDefinition } from '../../../src/js/Type/TypeDefinition.js';

describe("TypeDefinition", () => {
    'use strict';
    const typeDefinition = new TypeDefinition();
    let evaluator;
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", () => {
            expect(() => {
                TypeDefinition()
            }).toThrow();
        })
        it("'new' 키워드로 호출되었으면 예외를 던지지 않는다.", () => {
            expect(
                new TypeDefinition()
            ).toBeInstanceOf(TypeDefinition);
        })
    })

    beforeEach(() => {
        typeDefinition.definition = {};
    })
    describe("define(compareName, evaluator)", () => {
        it("compareName이 문자열이 아니면 예외를 던진다.", () => {
            name = 1;
            evaluator = () => {};
            expect(() => typeDefinition.define({name, evaluator})).toThrow()
        })
        it("evaluator이 함수가 아니면 예외를 던진다.", () => {
            name = 'test';
            evaluator = 'test';
            expect(() => typeDefinition.define({name, evaluator})).toThrow();
        })
        it("definition에 평가를 위한 규약을 추가한다.", () => {
            name = 'test';
            evaluator = () => 'test';
            typeDefinition.define({name, evaluator});
            expect(typeDefinition.definition['test']()).toBe('test');
        })
        it("컨텍스트를 반환한다.", () => {
            name = 'test';
            evaluator = () => 'test';
            expect(typeDefinition.define({name, evaluator})).toBe(typeDefinition);
        })
    })   
    describe("validate(target)", () => {
        it("definition에 정의 되어있지 않으면 예외를 던진다.", () => {
            expect()
        })
    }) 
    describe("", () => {

    }) 

})