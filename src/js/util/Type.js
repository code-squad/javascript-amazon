import { Registry } from './Registry.js';
import { Aop } from './Aop';

class Type extends Registry {
    constructor(){
        super();
        this.definition = {};
        this.aop = new Aop();
    }
    addDefinition(validator){
        let type = toString.call(validator);
        if(type !== '[object Object]' || type !== '[object Array]') new Error();
        if(type === '[object Object]')
            validator = [validator];
        this.defineMultiple(validator);
        return this;
    }
    checkArgsTypes(targetObj, targetFn, checkNames){
        if(toString.call(targetObj) !== "[object Object]") throw new Error();
        if(toString.call(targetFn) !== "[object String]") throw new Error();
        if(toString.call(checkNames) !== "[object Array]") throw new Error();
        const self = this;
        this.aop.inject(targetObj, targetFn, function(target) {
            let values = self.makeValues(checkNames, target);
            self.validateMultiple(values);
            return target.fn.apply(this, target.args);
        })
        return this;
    }
    makeValues(targetArr, target, values = []){
        targetArr.forEach((v,i) => values.push({name: v, target: target.args[i]}));
        return values;
    }
    checkReturnedValueType(targetObj, targetFn, checkName){
        if(toString.call(targetObj) !== "[object Object]") throw new Error();
        if(toString.call(targetFn) !== "[object String]") throw new Error();
        if(toString.call(checkName) !== "[object String]") throw new Error();
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
