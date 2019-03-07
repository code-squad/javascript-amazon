const defaultTypes = (function(){
    const isString = target => toString.call(target) === "[object String]"; 
    const isNumber = target => toString.call(target) === "[object Number]"; 
    const isUndefined = target => toString.call(target) === "[object Undefined]";
    const isBoolean = target => toString.call(target) === "[object Boolean]"; 
    const isObject = target => toString.call(target) === "[object Object]"; 
    const isFunction = target => toString.call(target) === "[object Function]";
    const isArray = target => toString.call(target) === "[object Array]";
    const isHtmlEl = target => target instanceof HTMLElement;
    const isHtmlCol = target => toString.call(target) === "[object HTMLCollection]";
    const isNodeList = target => target instanceof NodeList;
    return [
        {name: 'string', evaluator: isString},
        {name: 'number', evaluator: isNumber},
        {name: 'undefined', evaluator: isUndefined},
        {name: 'boolean', evaluator: isBoolean},
        {name: 'object', evaluator: isObject},
        {name: 'function', evaluator: isFunction},
        {name: 'array', evaluator: isArray},
        {name: 'DOMElement', evaluator: isHtmlEl},
        {name: 'HTMLCollection', evaluator: isHtmlCol},
        {name: 'NodeList', evaluator: isNodeList}
    ];
}());

export { defaultTypes };