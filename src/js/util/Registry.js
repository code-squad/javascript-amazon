class Registry{
    define({name, evaluator}){
        if(toString.call(name) !== "[object String]") throw new Error();
        if(toString.call(evaluator) !== "[object Function]") throw new Error();
        this.definition[name] = evaluator;
        return this;
    }
    validate({name, target}){
        if(toString.call(name) !== "[object String]") throw new Error();
        if(toString.call(target) !== "[object String]") throw new Error();
        if(!this.definition[name]) throw new Error();
        if(!this.definition[name](target)) throw new Error();
        return true;
    }
    defineMultiple(values){
        if(toString.call(values) !== "[object Array]") throw new Error();
        values.forEach(v => this.define(v));
        return this.definition;
    }
    validateMultiple(values){
        if(toString.call(values) !== "[object Array]") throw new Error();
        for(let value of values){
            if(!this.validate(value)) throw new Error;
        }
        return true;
    }
}

export { Registry };