const $ = el => document.querySelector(el);
const $All = el => document.querySelectorAll(el);

class Helpers{
    addClass(element, className){
        if(!(element instanceof HTMLElement)) throw new Error();
        if (element && !element.className.match(className)) {
            element.className += ' ' + className;
        }
        return element;
    }
    
    removeClass(element, className){
        if(!(element instanceof HTMLElement)) throw new Error();
        element.classList.remove(className);
        return element;
    }

    on (els, event, callback){
        if (!els) throw new Error();
        if (typeof els === 'string' || typeof els === 'object') els = [els];
        if (typeof event !== 'string') 
            throw new Error('Type error: `event` has to be a string');
        if (typeof callback !== 'function') 
            throw new Error('Type error: `callback` has to be a function');
            
        for (let i = 0; i < els.length; i++) {
            if (els[i].addEventListener) {
                els[i].addEventListener(event, callback, false);
            }
        }
        return els;
    }

    // isElementVisible(el){
    //     return !(el.offsetWidth === 0 && el.offsetHeight === 0);
    // }
}

export { $, $All, Helpers };