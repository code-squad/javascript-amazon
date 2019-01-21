const $ = el => document.querySelector(el);
const $All = el => document.querySelectorAll(el);

class Helpers{
    addClass (element, className) {
        if (element && !element.className.match(className)) {
            element.className += ' ' + className;
        }
    }
    
    removeClass (element, className) {
        element.className = element.className.replace(className, '').replace('  ', ' ');
    }

    on (event, elements, callback){
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].addEventListener) {
                elements[i].addEventListener(event, callback, false);
            }
        }
    }

    isElementVisible(){
        return !(element.offsetWidth === 0 && element.offsetHeight === 0);
    }
}

export { $, $All, Helpers };