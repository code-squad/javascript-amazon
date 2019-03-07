import { Helpers } from '../../util/Helpers';
class Plans{
    constructor(){
        this.helpers = new Helpers();
    }
    setEvent(els){
        const className = { active: 'active', clicked: 'clicked' }
        const coverEls = [ els.submitCover, els.frontCover ];
        const target = {
            headerBottom: els.header.offsetHeight,
            fixPoint: els.aboutBtn.offsetTop + els.aboutBtn.offsetHeight
        }
        this.helpers.on(window, 'scroll', _ =>{
            this.setScrollEvent(els, window.scrollY, className.active, target)
        })
        this.helpers.on(els.open, 'click', _ => {
            this.helpers.addClass(coverEls, className.clicked);
        })
        this.helpers.on(els.close, 'click', _ => {
            this.helpers.removeClass(coverEls, className.clicked);
        })
        return this;
    }
    setScrollEvent(els, currentTop, className, target){
        this.controllStickyNav([...els.stickyNavCover, els.stickyNav], target.fixPoint, currentTop, className);
        this.controllStickyNav(els.stickyNavCover, target.fixPoint, currentTop, className);
        this.controllStickyNav(els.stickyNav, target.headerBottom, currentTop, className);
        return this;
    }
    controllStickyNav(el, target, currentTop, className){
        (currentTop > target)? 
        this.helpers.addClass(el, className):this.helpers.removeClass(el, className);
        return this;
    }
}

export {Plans};


