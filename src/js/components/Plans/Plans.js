import { Helpers } from '../../util/Helpers';
class Plans{
    constructor(){
        this.H = new Helpers();
    }
    setEvent(els, target){
        const className = { active: 'active', clicked: 'clicked' }
        const coverEls = [ els.submitCover, els.frontCover ];
        this.H.on(window, 'scroll', _ =>{
            this.setScrollEvt(els, window.scrollY, className.active, target)
        })
        this.H.on(els.open, 'click', _ => {
            this.H.addClass(coverEls, className.clicked);
        })
        this.H.on(els.close, 'click', _ => {
            this.H.removeClass(coverEls, className.clicked);
        })
        return this;
    }
    setScrollEvt(els, currentTop, className, target){
        this.controllStickyNav([...els.stickyNavCover, els.stickyNav], target.fixPoint, currentTop, className);
        this.controllStickyNav(els.stickyNavCover, target.fixPoint, currentTop, className);
        this.controllStickyNav(els.stickyNav, target.headerBottom, currentTop, className);
        return this;
    }
    controllStickyNav(el, target, currentTop, className){
        (currentTop > target)? 
        this.H.addClass(el, className):this.H.removeClass(el, className);
        return this;
    }
}

export {Plans};


