import { Aop } from '../../../src/js/util/Aop.js';

describe("Aop", () => {
    'use strict';
    const aop = new Aop();
    let targetObj, Obj, instance, evaluator, advice, args, spy, spyF;
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", function(){
            expect(() => {
                Aop()
            }).toThrow();
        });
        it("'new' 키워드로 호출되었으면 예외를 던지지 않는다.", function(){
            expect(
                new Aop()
            ).toBeInstanceOf(Aop);
        });
    });
    beforeEach(() => {
        evaluator = '';
        targetObj = {
            fn: function(){
                evaluator += 'originFn';
                args = arguments;
                return 'returned value';
            }
        };
    });
    describe("inject(targetObj, method, advice)", () => {
        it("targetObject의 method 호출시 코드 조각(advice)이 실행된다.", () => {
            advice = jest.fn();
            aop.inject(targetObj, 'fn', advice);
            targetObj.fn();
            expect(advice).toHaveBeenCalled();
        })
        it("method의 기능을 유지한 채 새로운 advice 기능을 추가한다.", () => {
            advice = function(target){
                evaluator += 'advice and ';
                target.fn();
            };
            aop.inject(targetObj, 'fn', advice);
            targetObj.fn();
            expect(evaluator).toEqual('advice and originFn');
        })
        it("이전 기능을 유지한 채 새로운 기능 추가할 수 있다..", () => {
            advice = (target) => {
                evaluator += 'advice and ';
                target.fn.apply(this);
            };
            aop.inject(targetObj, 'fn', advice);
            aop.inject(targetObj, 'fn', advice);
            targetObj.fn();
            expect(evaluator).toEqual('advice and advice and originFn');
        })
        it("타겟 메소드의 인자를 체크할 수 있다.", () => {
            advice = function(target) {
                target.fn.apply(this, target.args);
                return target.args;
            };
            aop.inject(targetObj, 'fn', advice);
            expect(targetObj.fn('a','b')).toEqual(args);
        })
        it("타겟 메소드의 반환값을 체크할 수 있다.", () => {
            advice = function(target) {
                return target.fn.apply(this, target.args);
            };
            aop.inject(targetObj, 'fn', advice);
            expect(targetObj.fn()).toBe('returned value');
        })
        it("타깃 함수가 해당 생성자 함수의 컨텍스트에서 실행된다.", () => {
            Obj = function() {
                this.method = function(){
                    expect(this).toBeInstanceOf(Obj);
                }
            }
            advice = function(target) {
                target.fn.apply(this, target.args)
            };
            instance = new Obj();

            aop.inject(instance, 'method', advice);
            spy = jest.spyOn(instance, 'method');
            instance.method();
            expect(spy).toHaveBeenCalled();
        });
        it('advice은 타겟 오브젝트의 컨텍스트에서 실행된다.', () => {
            spyF = jest.fn();
            Obj = function() {
                this.method = function(){}
            }
            advice = function() {
                spyF();
                expect(this).toBeInstanceOf(Obj);
            };
            instance = new Obj();

            aop.inject(instance, 'method', advice);
            instance.method();
            expect(spy).toHaveBeenCalled();
        })
    })
    describe("invoke(targetObj)", () => {
        beforeEach(() => {
            spyF = jest.fn();
            advice = function(target) {
                spyF();
                return aop.invoke.call(this, target);
            };
            aop.inject(targetObj, 'fn', advice);
        })
        it('advice 함수가 정상적으로 바인딩 된다.', () => {
            aop.inject(instance, 'method', advice);
            instance.method();
            expect(spy).toHaveBeenCalled();
        })
        it("aop에 의해 targetObject가 바인딩 된 코드 조각(advice)와 함께 실행된다.", () => {
            expect(aop.invoke(targetObj)).toBe('returned value');
            advice = function(){
                return 'advice';
            }
            aop.inject(targetObj, 'fn', advice);
            expect(aop.invoke(targetObj)).toBe('advice');
        })
        it('타겟 메소드의 인자를 체크할 수 있다.', () => {
            Obj= {
                method: function(){
                    args = [...arguments];
                }
            }
            aop.inject(Obj, 'method', advice);
            Obj.method(1,2);
            expect(args).toEqual([1,2]);
        })
        it('타겟 메소드의 반환값을 체크할 수 있다.', () => {
            Obj= {
                method: function(){
                    return args = arguments;
                }
            }
            aop.inject(Obj, 'method', advice);
            expect(Obj.method('a','b')).toEqual(args);
        })

        it('주어진 코드는 타겟 오브젝트의 컨택스트에서 실행된다.', () => {
            Obj = function() {
                this.method = function(){
                    expect(this).toBeInstanceOf(Obj);
                }
            }
            instance = new Obj();

            aop.inject(instance, 'method', advice);
            instance.method();
        })
    })
});