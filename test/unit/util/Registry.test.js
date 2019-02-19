import { Registry } from '../../../src/js/util/Registry.js';

describe('Registry', () => {
    'use strict';
    const registry = new Registry();
    let evaluator, name, target, values, result;
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
        it("evaluator이 함수가 아니면 예외를 던진다.", () => {
            name = 'test';
            evaluator = 'test';
            expect(() => registry.define({name, evaluator})).toThrow();
        })
        it("definition에 평가를 위한 규약을 추가한다.", () => {
            name = 'test';
            evaluator = () => 'test';
            registry.define({name, evaluator});
            expect(registry.definition['test']()).toBe('test');
        })
        it("컨텍스트를 반환한다.", () => {
            name = 'test';
            evaluator = () => 'test';
            expect(registry.define({name, evaluator})).toBe(registry);
        })
    })   
    describe("validate(name, target)", () => {
        it("인자 name는 string 타입이 아닐시 예외를 던진다.", () => {
            name = 1;
            target = {};
            expect(() => registry.validate(name, target)).toThrow();
        })
        it("인자 target는 object 타입이 아닐시 예외를 던진다.", () => {
            name = 'test';
            target = () => {};
            expect(() => registry.validate(name, target)).toThrow();
        })
        it("definition에 정의 되어있지 않으면 예외를 던진다.", () => {
            expect(() => registry.validate('test', 'target')).toThrow();
        })
    }) 
    describe("defineMultiple(values)", () => {
        it('values가 배열이 아니면 예외를 던진다.', () => {
            values = 'string';
            expect(() => registry.defineMultiple(values)).toThrow();
        })
        it('values가 배열이면 예외를 던지지 않는다.', () => {
            values = [];
            expect(() => registry.defineMultiple(values)).not.toThrow();
        })
        it('values의 각 오브젝트는 definition에 추가된다.', () => {
            values = [
                {name: 'test', evaluator: () => {}},
                {name: 'test1', evaluator: () => {}},
                {name: 'test2', evaluator: () => {}}
            ];
            expect(registry.defineMultiple(values)).toEqual(registry.definition);
        })
    }) 
    describe("validateMultible(values)", () => {
        it('values가 배열이 아니면 예외를 던진다.', () => {
            values = 'string';
            expect(() => registry.validateMultiple(values)).toThrow();
        })
        it('values가 배열이면 예외를 던지지 않는다.', () => {
            values = [];
            expect(() => registry.validateMultiple(values)).not.toThrow();
        })
        it('values의 각 오브젝트의 유효성 검사를 한다.', () => {
            values = [
                {name: 'test', evaluator: (target) => {
                    return toString.call(target) === '[object String]';}}
            ]
            expect(registry.defineMultiple(values)).toBe(registry.definition);
            values = [{name: 'test', target: 'target'}];
            expect(registry.validateMultiple(values)).toBe(true);
        })
    })
})