const $ = (selector, context) => (context || document).querySelector(selector);
const $All = (selector, context) => (context || document).querySelectorAll(selector);

class Helpers{
    addClass(els, className){
        if(els instanceof HTMLElement) els = [els];
        for(let el of els){
            if(!(el instanceof HTMLElement)) throw new Error();
            if(el && !el.className.match(className)) el.className += ' ' + className;
        }
        return els;
    }
    removeClass(els, className){
        if(els instanceof HTMLElement) els = [els];
        for(let el of els){
            if(!(el instanceof HTMLElement)) throw new Error();
            el.classList.remove(className);
        }
        return els;
    }
    on (els, event, callback){
        
        if (!els) throw new Error();
        if (toString.call(els) !== '[object Array]'&&
            toString.call(els) !== '[object NodeList]') els = [els];
        if (toString.call(event) !== '[object String]') 
            throw new Error('Type error: `event` has to be a string');
        if (toString.call(callback) !== '[object Function]') 
            throw new Error('Type error: `callback` has to be a function');
        for (let i = 0; i < els.length; i++) {
            if (els[i].addEventListener) {
                els[i].addEventListener(event, callback, false);
            }
        }
        return els;
    }
}

export { $, $All, Helpers };