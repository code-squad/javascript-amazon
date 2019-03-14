import { Type } from '../../../src/js/util/Type';
import { defaultTypes } from '../../../src/js/util/typeCollection/defaultTypes';

describe("TypeChecker", () => {
    'use strict';
    const type = new Type();
    let validator, value, targetObj, spy, checkNames;
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", () => {
            expect(() => {
                Type()
            }).toThrow();
        })
        it("'new' 키워드로 호출되었으면 예외를 던지지 않는다.", () => {
            expect(
                new Type()
            ).toBeInstanceOf(Type);
        })
    });

    beforeEach(() => {
        type.definition = {};
        targetObj = {
            "targetFn": function(){
                return [...arguments];
            }
        }
    })
    describe("addDefinition(validator)", () => {
        it("validator가 객체, 배열 타입이 아닐시 예외를 던진다.", () => {
            type.define([...defaultTypes]);
            value = 'string';
            expect(() => type.addDefinition(value)).toThrow();
        })
        it("상속된 Registry의 define 메소드가 실행된다.", () => {
            validator = {name: 'number', evaluator: t => 
                toString.call(t) === "[object Number]"};
            type.addDefinition(validator);
            spy = jest.spyOn(type, "define");
            type.addDefinition([{name:"string", target:"test"}]);
            expect(spy).toHaveBeenCalled();
        })
        it("helpers의 type check 기능이 실행된다.", () => {
            spy = jest.spyOn(type.H, "checkType");
            type.addDefinition([]);
            expect(spy).toHaveBeenCalled();
        })
        it("현재 컨텍스트를 반환한다.", () => {
            value = {name: 'string', evaluator: () => {}};
            expect(type.addDefinition(value)).toBeInstanceOf(Type);
        })
    })
    describe("checkArgsTypes(targetObj, targetFn, typeNames)", () => {
        it("targetObj 타입이 오브젝트가 아닐 경우 예외를 던진다.", () => {
            targetObj = 'string';
            expect(() => type.checkArgsTypes(targetObj, 'targetFn', []))
                .toThrow();
        })
        it("targetFn 타입이 문자열이 아닐 경우 예외를 던진다.", () => {
            expect(() => type.checkArgsTypes(targetObj, 1, []))
                .toThrow();
        })
        it("typeNames 타입이 배열이 아닐 경우 예외를 던진다.", () => {
            expect(() => type.checkArgsTypes(targetObj, 'targetFn', 'string'))
                .toThrow();
        })
        it("각 인자의 타입이 올바르면 에러가 발생하지 않는다.", () => {
            expect(() => type.checkArgsTypes(targetObj, 'targetFn', []))
                .not.toThrow();
        })
        it("현재 컨텍스트를 반환한다.", () => {
            expect(type.checkArgsTypes(targetObj, 'targetFn', []))
                .toBeInstanceOf(Type);
        })
        describe("애스팩트 기능", () => {
            it("validate 메소드가 실행된다.", () => {
                spy = jest.spyOn(type, "validate");
                type.checkArgsTypes(targetObj, 'targetFn', []);
                targetObj.targetFn();
                expect(spy).toHaveBeenCalled();
            })
            it("makeValues 메소드가 실행된다.", () => {
                spy = jest.spyOn(type, "makeValues");
                type.checkArgsTypes(targetObj, 'targetFn', []);
                targetObj.targetFn();
                expect(spy).toHaveBeenCalled();
            })
            it("타겟 함수는 정상 실행 및 반환된다.", () => {
                type.define([...defaultTypes]);
                spy = jest.spyOn(type, "validate");
                checkNames = ['string'];
                type.checkArgsTypes(targetObj, 'targetFn', checkNames);
                expect(targetObj.targetFn('test')).toEqual(['test']);
            })
        })
    })
    describe("checkReturnedValueType(targetObj, targetFn, checkName)", () => {
        it("targetObj 타입이 오브젝트가 아닐 경우 예외를 던진다.", () => {
            targetObj = 'string';
            expect(() => type.checkReturnedValueType(targetObj, 'targetFn', 'string'))
                .toThrow();
        })
        it("targetFn 타입이 문자열이 아닐 경우 예외를 던진다.", () => {
            expect(() => type.checkReturnedValueType(targetObj, 1, 'string'))
                .toThrow();
        })
        it("checkName 타입이 문자열이 아닐 경우 예외를 던진다.", () => {
            expect(() => type.checkReturnedValueType(targetObj, 'string', 1))
                .toThrow();
        })
        it("각 인자의 타입이 올바르면 에러가 발생하지 않는다.", () => {
            expect(() => type.checkReturnedValueType(targetObj, 'targetFn', 'string'))
                .not.toThrow();
        })
        it("현재 컨텍스트를 반환한다.", () => {
            expect(type.checkReturnedValueType(targetObj, 'targetFn', 'string'))
                .toBeInstanceOf(Type);
        })
        describe("애스팩트 기능", () => {
            beforeEach(()=>{
                type.define([...defaultTypes]);
            })
            it("타겟의 메소드를 실행하면 타입 체크를 위한 validate 메소드가 실행된다.", () => {
                spy = jest.spyOn(type, "validate");
                type.checkReturnedValueType(targetObj, 'targetFn', 'array');
                targetObj.targetFn();
                expect(spy).toHaveBeenCalled();
            })
            it("타겟 메소드는 정상 실행 및 반환된다.", () => {
                spy = jest.spyOn(type, "validate");
                type.checkReturnedValueType(targetObj, 'targetFn', 'array');
                expect(targetObj.targetFn('test')).toEqual(['test']);
            })
        })
    })

})