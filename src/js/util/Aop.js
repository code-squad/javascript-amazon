class Aop{
    inject(targetObj, method, advice){
        var originalFn = targetObj[method];
        targetObj[method] = function(){
            return advice.call(this, {fn:originalFn, args: arguments})
        };
    }
    invoke(targetObj){
        return targetObj.fn.apply(this, targetObj.args);
    }
}

export { Aop };