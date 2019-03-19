class PlansTypes {
    constructor(plans, type){
        this.plans = plans;
        this.type = type;
        this.define(this.plans);
    }
    define(targetObj){
        if(toString.call(targetObj) !== "[object Object]") throw new Error();
        this.type.checkArgsTypes(targetObj, 'setEvent', ['object']);
        this.type.checkArgsTypes(targetObj, 'setScrollEvent', ['object', 'number', 'string', 'object']);
        this.type.checkArgsTypes(targetObj, 'controllStickyNav', [['NodeList', 'DOMElement','array'], 'number', 'number', 'string']);
        return this;
    }
}

export { PlansTypes };