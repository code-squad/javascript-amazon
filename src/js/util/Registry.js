class Registry{
    define({name, evaluator}){
        if(toString.call(name) !== "[object String]") throw new Error();
        if(toString.call(evaluator) !== "[object Function]") throw new Error();
        this.definition[name] = evaluator;
        return this;
    }
    validate({name, target}){
        if(toString.call(name) !== "[object String]") throw new Error();
        if(!this.definition[name]) throw new Error();
        return this.definition[name](target);
    }
    defineMultiple(values){
        if(toString.call(values) !== "[object Array]") throw new Error();
        values.forEach(v => {
            if(toString.call(v) === "[object Object]") this.define(v)
        });
        return this.definition;
    }
    validateMultiple(values){
        if(toString.call(values) !== "[object Array]") throw new Error();
        values.forEach(value => {
            if(toString.call(value.name) === '[object Array]') {
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