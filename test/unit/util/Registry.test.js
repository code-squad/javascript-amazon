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
        it("evaluator이 함수가 아니면 예외를 던진다.", () => {
            name = 'test';
            evaluator = 'test';
            expect(() => registry.define({name, evaluator})).toThrow();
        })
        it("compareName이 문자열이고 evaluator이 함수면 예외를 던지지 않는다.", ()=>{
            name = 'test';
            evaluator = () => {};
            expect(() => registry.define({name, evaluator})).not.toThrow();
        })
        it("definition에 평가를 위한 규약을 추가한다.", () => {
            spy = jest.fn();
            name = 'test';
            evaluator = () => 'test';
            registry.define({name, evaluator});
            expect(registry.definition['test']()).toBe('test');
            for(let v in registry.definition){
                spy();
            }
            expect(spy).toHaveBeenCalledTimes(1);
        })
        it("체이너블한 메소드를 반환한다.", () => {
            name = 'test';
            evaluator = () => {};
            expect(registry.define({name, evaluator})).toBe(registry);
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
            registry.define({name, evaluator});
            expect(registry.validate({name, target: 'target'})).toBe(true);
        })
        it("target이 definition 규약을 지키지 않으면 false를 반환한다.", () => {
            name = 'string';
            evaluator = target => toString.call(target) === "[object String]";
            registry.define({name, evaluator});
            expect(registry.validate({name, target: 1})).toBe(false);
        })
    })
    describe("defineMultiple(values)", () => {
        beforeEach(()=>{
            spy = jest.spyOn(registry, "define")
        })
        afterEach(()=>{
            spy.mockRestore();
        })
        it('values가 배열이 아니면 예외를 던진다.', () => {
            values = 'string';
            expect(() => registry.defineMultiple(values)).toThrow();
        })
        it('values가 배열이면 예외를 던지지 않는다.', () => {
            values = [];
            expect(() => registry.defineMultiple(values)).not.toThrow();
        })
        it('values의 오브젝트가 비어있으면 define 메소드가 실행되지 않는다.', () => {
            values = [];
            expect(registry.defineMultiple(values)).toEqual(registry.definition);
            expect(spy).not.toHaveBeenCalled();
        })
        it('values안의 오브젝트가 하나면 define 메소드가 한 번 실행된다.', () => {
            values = [
                {name: 'test', evaluator: () => {}}
            ];
            expect(registry.defineMultiple(values)).toEqual(registry.definition);
            expect(spy).toHaveBeenCalledTimes(1);
        })
        it('values의 각 오브젝트의 수만큼 define 메소드가 실행된다.', () => {
            values = [
                {name: 'test', evaluator: () => {}},
                {name: 'test1', evaluator: () => {}},
                {name: 'test2', evaluator: () => {}}
            ];
            expect(registry.defineMultiple(values)).toEqual(registry.definition);
            expect(spy).toHaveBeenCalledTimes(3);
        })
        it("values에서 콤마가 연속되면 무시한다.", () => {
            values = [
                {name: 'test', evaluator: () => {}},
                ,,,
                {name: 'test2', evaluator: () => {}}
            ];
            expect(registry.defineMultiple(values)).toEqual(registry.definition);
            expect(spy).toHaveBeenCalledTimes(2);
        })
    }) 
    describe("validateMultible(values)", () => {
        beforeEach(()=>{
            spy = jest.spyOn(registry, "validate");
            values = [
                {name: 'string', evaluator: (target) => {
                    return toString.call(target) === '[object String]';}},
                {name: 'number', evaluator: (target) => {
                    return toString.call(target) === '[object Number]';}}
            ]
            expect(registry.defineMultiple(values)).toBe(registry.definition);
        })
        afterEach(()=>{
            spy.mockRestore();
        })
        it('values가 배열이 아니면 예외를 던진다.', () => {
            values = 'string';
            expect(() => registry.validateMultiple(values)).toThrow();
        })
        it('values가 배열이면 예외를 던지지 않는다.', () => {
            values = [];
            expect(() => registry.validateMultiple(values)).not.toThrow();
        })
        it('values가 빈 배열이면 multiple 메소드가 실행되지 않는다.', () => {
            values = [];
            expect(registry.defineMultiple(values)).toBe(registry.definition);
            expect(spy).toHaveBeenCalledTimes(0);
        })
        it('values가 한 개의 오브젝트를 가지는 배열이면 multiple 메소드는 한 번만 실행된다.', () => {
            values = [
                {name: 'test', evaluator: (target) => {
                    return toString.call(target) === '[object String]';}}
            ]
            expect(registry.defineMultiple(values)).toBe(registry.definition);
            values = [{name: 'test', target: 'target'}];
            expect(registry.validateMultiple(values)).toBe(true);
            expect(spy).toHaveBeenCalledTimes(1);
        })
        it('values의 오브젝트 갯수만큼 multiple 메소드가 실행된다.', () => {
            values = [
                {name: 'string', target: 'target'},
                {name: 'number', target: 1}
            ];
            expect(registry.validateMultiple(values)).toBe(true);
            expect(spy).toHaveBeenCalledTimes(2);
        })
        it("values에서 콤마가 연속되면 무시한다.", () => {
            values = [
                {name: 'string', target: 'target'},
                ,,,
                {name: 'number', target: 1}
            ];
            expect(registry.validateMultiple(values)).toBe(true);
            expect(spy).toHaveBeenCalledTimes(2);
        })
    })
})