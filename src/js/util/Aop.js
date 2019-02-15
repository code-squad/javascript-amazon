class Aop{
    inject(obj, method, advice){
        var originalFn = obj[method];
        obj[method] = function(){
            advice.call(this, {fn:originalFn, args: arguments})
        };
    }
}

export { Aop };