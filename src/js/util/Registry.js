import { Helpers } from "./Helpers"
class Registry{
    constructor(){
        this.H = new Helpers();
    }
    define(values){
        if(!this.H.checkType('array', values)) throw new Error();
        values.forEach(v => {
            if(this.H.checkType('object', v)) this.definition[v.name] = v.evaluator;
        });
        return this.definition;
    }
    validate(values){
        if(!this.H.checkType('array', values)) values = [values];
        values.forEach(value => {
            if(this.H.checkType('array', value.name)) {
                let result = value.name.some(n => this.definition[n](value.target));
                if(!result) throw new Error();
            } else {
                if(!this.definition[value.name](value.target)) throw new Error;
            }
        })
        return true;
    }
}

export { Registry };