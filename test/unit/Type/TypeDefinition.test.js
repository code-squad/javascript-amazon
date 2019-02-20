import { TypeDefinition } from '../../../src/js/Type/TypeDefinition.js';
import { typeCollection } from '../../../src/js/Type/typeCollection.js';
import { Aop } from '../../../src/js/util/Aop.js';


describe("TypeDefinition", () => {
    'use strict';
    const aop = new Aop();
    const typeDefinition = new TypeDefinition(aop);
    let validator, value, typeFnc, obj, spy;
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
        typeDefinition.define({name: 'string', evaluator: target => toString.call(target)})
        typeDefinition.defineMultiple(typeCollection);
    })
    describe("init(validator)", () => {
        it("validator가 객체 타입일 시 배열 타입으로 변환한다.", () => {
            value = {name: 'string', evaluator: () => {}};
            expect(() => typeDefinition.init(value)).not.toThrow();
        })
        it("타입 체크 규약을 definition에 추가한다.", () => {
            validator = {name: 'number', evaluator: type => 
                toString.call(type) === "[object Number]"};
            typeDefinition.init(validator);
            expect(typeDefinition.definition['number'](1)).toBe(true);
        })
    })
    beforeEach(() => {
        obj = {
            'fn': function(){
                console.log(arguments);
                return '123';
            }
        };
        typeFnc = function(obj, fn, type) {
            aop.inject(obj, fn, function(target) {
                typeDefinition.checkArgsType(target, 'fn', type);
                target.fn.apply(this, target.args)
            })
        }
    })
    describe("checkArguments(obj, method, typeName)", () => {
        it("타겟의 메소드를 실행하면 타입 체크를 위한 validate 메소드가 실행된다.", () => {
            typeFnc(obj, 'fn', 'string');
            spy = jest.spyOn(typeDefinition, 'validate');
            obj.fn('123');
            expect(spy).toHaveBeenCalled();
        })
    })
    describe("checkResultsType(obj, method, typeName)", () => {
        it("타겟의 메소드를 실행하면 타입 체크를 위한 validate 메소드가 실행된다.", () => {
            typeFnc(obj, 'fn', 'string');
            spy = jest.spyOn(typeDefinition, 'validate');
            obj.fn('123');
            expect(spy).toHaveBeenCalled();
        })
    })

})