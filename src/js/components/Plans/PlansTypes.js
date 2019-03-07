class PlansTypes {
    constructor(plans, type){
        this.plans = plans;
        this.type = type;
        this.define(this.plans);
    }
    define(targetObj){
        if(toString.call(targetObj) !== "[object Object]") throw new Error();
        this.type.checkArgs(targetObj, 'setEvent', ['object']);
        this.type.checkArgs(targetObj, 'setScrollEvent', ['object', 'number', 'string', 'object']);
        this.type.checkArgs(targetObj, 'controllStickyNav', [['NodeList', 'DOMElement','array'], 'number', 'number', 'string']);
        return this;
    }
}

export { PlansTypes };