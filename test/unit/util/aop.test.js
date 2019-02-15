import { Aop } from '../../../src/js/util/Aop.js';

describe("Aop", () => {
    'use strict';
    const aop = new Aop();
    let obj, data;
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
        obj = {
            fn: () => {
                data.push('Run originFn');
                return '123';
            }
        };
        data = [];

    })
    describe("inject(obj, method, advice)", () => {
        it("object의 method 호출시 코드 조각(advice)이 실행된다.", () => {
            const advice = jest.fn();
            aop.inject(obj, 'fn', advice);
            obj['fn']();
            expect(advice).toHaveBeenCalled();
        })
        it("method의 기능을 유지한 채 새로운 advice 기능을 추가한다.", () => {
            const advice = (target) => {
                data.push('Add function');
                target.fn();
            };
            aop.inject(obj, 'fn', advice);
            obj['fn']();
            expect(data).toEqual(['Add function', 'Run originFn']);
        })
        it("이전 기능을 유지한 채 새로운 기능 추가할 수 있다..", () => {
            const advice = (target) => {
                data.push('Add function');
                target.fn();
            };
            aop.inject(obj, 'fn', advice);
            aop.inject(obj, 'fn', advice);
            obj.fn();
            expect(data).toEqual(['Add function', 'Add function', 'Run originFn']);
        })
        it("advice에서 타깃 객체로 파라미터를 넘길 수 있다.", () => {
            let argsToTarget;
            const obj = {
                fn: function() {
                    argsToTarget = [...arguments];
                }
            };
            const advice = function(target) {
                target.fn.apply(this, target.args)
            };
            aop.inject(obj, 'fn', advice);
            obj.fn('a','b');
            expect(argsToTarget).toEqual(['a','b']);
        })
        it("타깃 함수가 해당 타겟 오브젝트의 컨텍스트에서 실행된다.", () => {
            const Obj = function() {
                this.method = function(){
                    expect(this).toBeInstanceOf(Obj);
                }
            }
            const advice = function(target) {
                target.fn.apply(this, target.args)
            };
            const instance = new Obj();
            aop.inject(instance, 'fn', advice);
            const spy = jest.spyOn(instance, 'method');
            instance.method();
            expect(spy).toHaveBeenCalled();
        });
        it('advice은 타겟 오브젝트의 컨텍스트에서 실행된다.', () => {
            const Obj = function() {
                this.method = function(){}
            }
            const advice = function() {
                expect(this).toBeInstanceOf(Obj);
            };
            const instance = new Obj();
            aop.inject(instance, 'fn', advice);
            instance.method();
        })
    })
});