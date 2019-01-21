import { $, $All, Helpers } from './Helpers.js';

class Plans{
    constructor(visible, hidden){
        this.Helpers = new Helpers();
        this.hidden = $(hidden);
        this.visible = $(visible);
        this.toggleBtn = [];
        this.init();
    }
    init(){
    }
    event(){
       
    }
    show(){

    }
    hidden(){

    }
    checkScroll(){
        window.addEventListener('scroll', e => console.log(window.scrollY));
    }
}

export { Plans };

