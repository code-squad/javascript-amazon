import { $, $All } from '../../util/Helpers';

class Plans{
    constructor(helpers){
        this.helpers = helpers;
    }
    init(){
        const els = {
            stickyNav: $('.fixed-nav'),
            stickyNavCover: $All('.fixed-nav__cover'),
            frontCover: $(".fixed-nav__cover--front"),
            submitCover: $(".fixed-nav__cover--submit"),
            open: $All("[data-open=fixedNav]"),
            close: $All("[data-close=fixedNav]"),
            header: $(".header"),
            aboutBtn: $(".submit-box__submit")
        }
        const className = { active: 'active', clicked: 'clicked' }
        const target = {
            headerBottom: els.header.offsetHeight,
            fixPoint: els.aboutBtn.offsetTop + els.aboutBtn.offsetHeight
        }
        const eachCoverEls = [ els.submitCover, els.frontCover ];
        this.setEvent(this.helpers, els, className, target, eachCoverEls);
    }
    setEvent(helpers, els, className, target, eachCoverEls){
        helpers.on(window, 'scroll', _ =>{
            this.setScrollEvent(els, window.scrollY, className.active, target)
        })
        helpers.on(els.open, 'click', _ => {
            helpers.addClass(eachCoverEls, className.clicked);
        })
        helpers.on(els.close, 'click', _ => {
            helpers.removeClass(eachCoverEls, className.clicked);
        })
    }
    setScrollEvent(els, currentTop, className, target){
        this.controllStickyNav([...els.stickyNavCover, els.stickyNav], target.fixPoint, currentTop, className);
        this.controllStickyNav(els.stickyNavCover, target.fixPoint, currentTop, className);
        this.controllStickyNav(els.stickyNav, target.headerBottom, currentTop, className);
    }
    controllStickyNav(el, target, currentTop, className){
        (currentTop > target)? 
        this.helpers.addClass(el, className):this.helpers.removeClass(el, className);
    }
}

export {Plans};


