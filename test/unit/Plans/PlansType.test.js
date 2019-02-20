import { PlansTypes } from '../../../src/js/Plans/PlansTypes.js';
import { Plans } from '../../../src/js/Plans/Plans.js';
import { Aop } from '../../../src/js/util/Aop.js';
import { PlansDefinition } from '../../../src/js/Type/TypeDefinition';

describe("PlansTypes", () => {
    const aop = new Aop();
    const plans = new Plans();
    const plansTypes = new PlansTypes();
    const plansDefinition = new PlansDefinition();
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", () => {
            expect(() => {
                PlansTypes()
            }).toThrow();
        })
        it("'new' 키워드로 호출되었으면 예외를 던지지 않는다.", () => {
            expect(
                new PlansTypes()
            ).toBeInstanceOf(PlansTypes);
        })
    })
})