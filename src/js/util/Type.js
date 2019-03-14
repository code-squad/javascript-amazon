import { Registry } from './Registry.js';
import { Aop } from './Aop';
import { Helpers } from './Helpers';

class Type extends Registry {
    constructor(){
        super();
        this.definition = {};
        this.aop = new Aop();
        this.H = new Helpers();
    }
    addDefinition(validator){
        if(!this.H.checkType('object', validator) && !this.H.checkType('array', validator)) throw new Error();
        if(this.H.checkType('object', validator)) validator = [validator];
        this.define(validator);
        return this;
    }
    checkArgsTypes(targetObj, targetFn, checkNames){
        if(!this.H.checkType('object', targetObj)) throw new Error();
        if(!this.H.checkType('string', targetFn)) throw new Error();
        if(!this.H.checkType('array', checkNames)) throw new Error();
        const self = this;
        this.aop.inject(targetObj, targetFn, function(target) {
            let values = self.makeValues(checkNames, target);
            self.validate(values);
            return target.fn.apply(this, target.args);
        })
        return this;
    }
    makeValues(targetArr, target, values = []){
        targetArr.forEach((v,i) => values.push({name: v, target: target.args[i]}));
        return values;
    }
    checkReturnedValueType(targetObj, targetFn, checkName){
        if(!this.H.checkType('object', targetObj)) throw new Error();
        if(!this.H.checkType('string', targetFn)) throw new Error();
        if(!this.H.checkType('string', checkName)) throw new Error();
        const self = this;
        this.aop.inject(targetObj, targetFn, function(target) {
            let result = target.fn.apply(this, target.args);
            self.validate({name: checkName, target: result});
            return result;
        })
        return this;
    }
}

export { Type };
