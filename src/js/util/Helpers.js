import { defaultTypes } from './typeCollection/defaultTypes';

const $ = (selector, context) => (context || document).querySelector(selector);
const $All = (selector, context) => (context || document).querySelectorAll(selector);

class Helpers{
    addClass(els, className){
        if(this.checkType("DOMElement", els)) els = [els];
        for(let el of els){
            if(!this.checkType("DOMElement", el)) throw new Error();
            if(el && !el.className.match(className)) el.className += ' ' + className;
        }
        return els;
    }
    removeClass(els, className){
        if(this.checkType("DOMElement", els)) els = [els];
        for(let el of els){
            if(!this.checkType("DOMElement", el)) throw new Error();
            el.classList.remove(className);
        }
        return els;
    }
    on (els, event, callback){
        if (!els) throw new Error();
        if (!this.checkType("array", els) && !this.checkType("NodeList", els)) els = [els];
        if (!this.checkType("string", event)) throw new Error('Type error: `event` has to be a string');
        if (!this.checkType("function", callback)) throw new Error('Type error: `callback` has to be a function');
        for (let i = 0; i < els.length; i++) {
            if (els[i].addEventListener) {
                els[i].addEventListener(event, callback, false);
            }
        }
        return els;
    }
    createEl(parent, tagName, className){
        const el = document.createElement(tagName);
        this.addClass(el, className);
        parent.appendChild(el);
        return el;
    }
    checkType(name, target){
        const types = [...defaultTypes];
        const validator = types.filter(v => v.name === name)[0];
        return validator.evaluator(target);
    }
}

export { $, $All, Helpers };