import { Registry } from '../util/Registry.js';
import { typeCollection } from './typeCollection.js';

class TypeDefinition extends Registry {
    constructor(aop){
        super();
        this.typeDefinition = {};
        this.aop = aop;
    }
    init(validator){
        if(toString.call(validator) === '[object Object]')
            validator = [validator];
        this.defineMultiple(validator);
    }
    checkArgsType(obj, method, checkName){
        const self = this;
        this.aop.inject(obj, method, function(target) {
            self.validate({name: checkName, target: target.args[0]});
            target.fn.apply(this, target.args);
        })
    }
    checkResultsType(obj, method, checkName){
        const self = this;
        this.aop.inject(obj, method, function(target) {
            let result = target.fn.apply(this, target.args);
            self.validate({name: checkName, target: result});
        })
    }
}

export { TypeDefinition };
