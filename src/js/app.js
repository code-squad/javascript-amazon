import { Helpers } from './util/Helpers';
import { PlansTypes } from './components/Plans/PlansTypes';
import { Plans } from './components/Plans/Plans';
import { Aop } from './util/Aop';
import { Type } from './util/Type';
import { defaultTypes } from './util/typeCollection/defaultTypes';

document.addEventListener("DOMContentLoaded", () => {
    const aop = new Aop();
    const type = new Type(aop);
    const helpers = new Helpers();
    const plans = new Plans(helpers);
    type.addDefinition(defaultTypes);
    new PlansTypes(plans, type);
    plans.init();
});