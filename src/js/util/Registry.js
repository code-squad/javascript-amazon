import { Helpers } from "./Helpers"
class Registry{
    constructor(){
        this.H = new Helpers();
    }
    define({name, evaluator}){
        if(!this.H.checkType('string', name)) throw new Error();
        if(!this.H.checkType('function', evaluator)) throw new Error();
        this.definition[name] = evaluator;
        return this;
    }
    validate({name, target}){
        if(!this.H.checkType('string', name)) throw new Error();
        if(!this.definition[name]) throw new Error();
        return this.definition[name](target);
    }
    defineMultiple(values){
        if(!this.H.checkType('array', values)) throw new Error();
        values.forEach(v => {
            if(this.H.checkType('object', v)) this.define(v)
        });
        return this.definition;
    }
    validateMultiple(values){
        if(!this.H.checkType('array', values)) throw new Error();
        values.forEach(value => {
            if(this.H.checkType('array', value.name)) {
                let result = value.name.some(n => this.definition[n](value.target));
                if(!result) throw new Error();
            }else{
                if(!this.validate(value)) throw new Error;
            }
        })
        return true;
    }
}

export { Registry };