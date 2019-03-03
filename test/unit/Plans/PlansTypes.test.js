import { PlansTypes } from '../../../src/js/components/Plans/PlansTypes.js';
import { Plans } from '../../../src/js/components/Plans/Plans.js';
import { Aop } from '../../../src/js/util/Aop.js';
import { Type } from '../../../src/js/util/Type';

describe("PlansTypes", () => {
    const aop = new Aop();
    const plans = new Plans();
    const type = new Type(aop);
    const plansTypes = new PlansTypes(plans, type);
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", () => {
            expect(() => {
                PlansTypes()
            }).toThrow();
        })
        it("constructor 인자로 타겟 인스턴스를 받지 않으면 예외를 던진다.", () => {
            expect(() => {
                expect(
                    new PlansTypes()
                ).toThrow();    
            })
        })
        it("constructor 인자로 type 인스턴스를 받지 않으면 예외를 던진다.", () => {
            expect(() => {
                expect(
                    new PlansTypes(plans)
                ).toThrow();    
            })
        })
        it("'new' 키워드로 호출되며 인스턴스를 인자로 받으면 예외를 던지지 않는다.", () => {
            expect(
                new PlansTypes(plans, type)
            ).toBeInstanceOf(PlansTypes);
            expect(() =>
                new PlansTypes(plans, type)
            ).not.toThrow(PlansTypes);
        })
    })

    describe("define", () => {
        it("인자가 객체 타입이 아닐 시 예외를 던진다.", ()=>{
            expect(() => plansTypes.define(1)).toThrow();
        })
        it("인자가 인스턴스이면 예외를 던지지 않는다.", () => {
            expect(() => plansTypes.define(plans)).not.toThrow();
        })
        it("컨텍스트를 반환한다.", () => {
            expect(plansTypes.define(plans)).toBeInstanceOf(PlansTypes);
        })
    })
})