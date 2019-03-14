import { Registry } from '../../../src/js/util/Registry.js';

describe('Registry', () => {
    'use strict';
    const registry = new Registry();
    let evaluator, name, target, values, spy;
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", function(){
            expect(() => {
                Registry()
            }).toThrow();
        });
        it("'new' 키워드로 호출되었으면 예외를 던지지 않는다.", function(){
            expect(
                new Registry()
            ).toBeInstanceOf(Registry);
        });
    });
    beforeEach(() => {
        registry.definition = {};
    })
    describe("define(compareName, evaluator)", () => {
        it("compareName이 문자열이 아니면 예외를 던진다.", () => {
            name = 1;
            evaluator = () => {};
            expect(() => registry.define({name, evaluator})).toThrow()
        })
        it('values가 배열이 아니면 예외를 던진다.', () => {
            values = 'string';
            expect(() => registry.define(values)).toThrow();
        })
        it('values가 배열이면 예외를 던지지 않는다.', () => {
            values = [];
            expect(() => registry.define(values)).not.toThrow();
        })
        it("definition에 평가를 위한 규약을 추가한다.", () => {
            spy = jest.fn();
            name = 'test';
            evaluator = () => 'test';
            registry.define([{name, evaluator}]);
            expect(registry.definition['test']()).toBe('test');
        })
    })   
    describe("validate(name, target)", () => {
        it("인자 name이 string 타입이 아닐시 예외를 던진다.", () => {
            name = 1;
            target = {};
            expect(() => registry.validate({name, target})).toThrow();
        })
        it("definition에 정의 되어있지 않으면 예외를 던진다.", () => {
            name = 'test';
            target = {};
            expect(() => registry.validate({name, target})).toThrow();
        })
        it("target이 definition 규약을 지키면 true를 반환한다.", () => {
            name = 'string';
            evaluator = target => toString.call(target) === "[object String]";
            registry.define([{name, evaluator}]);
            expect(registry.validate({name, target: 'target'})).toBe(true);
        })
        it("target이 definition 규약을 지키지 않으면 예외를 던진다.", () => {
            name = 'string';
            evaluator = target => toString.call(target) === "[object String]";
            registry.define([{name, evaluator}]);
            expect(() => registry.validate({name, target: 1})).toThrow();
        })
    })
})