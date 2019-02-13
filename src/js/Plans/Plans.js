
class Plans{
    constructor(helpers){
        this.helpers = helpers;
    }
    showStickNav(el, target, currentTop){
        if(currentTop < target) this.helpers.addClass(el);
    }
    hideStickyNav(el, target, currentTop){
        if(currentTop > target) this.helpers.removeClass(el);
    }
    setEvent(els, event, callback){
        document.addEventListener(event, callback);
    }
}


export {Plans};






























// import {$, $All} from '../Helpers/Helpers.js';

// class Plans{
//     constructor(Helpers){
//         this.Helpers = Helpers;
//         this.submitPage = $('.fixed-nav__submit');
//         this.initialPage = $('.fixed-nav__front');
//         this.fixedNav = $('.fixed-nav');
//         this.p_about = $('.prime-about');
//         this.btns = {
//             open: $All('[data-open=fixedNav]'),
//             close: $All('[data-close=fixedNav]')
//         };
//         this.addEvent(this.btns);
//     }
//     addEvent(btns){
//         this.Helpers.on('click', btns.open, this.toggleBtn.bind(this, 'open'));
//         this.Helpers.on('click', btns.close, this.toggleBtn.bind(this, 'close', this.p_about));
//         this.Helpers.on('scroll', window, this.toggleNav.bind(this, this.p_about));
//     }
//     toggleNav(p_about){
//         if(scrollY > p_about.offsetTop + p_about.offsetHeight/2){
//             this.show(this.fixedNav);
//         } else {
//             if(!this.Helpers.isElementVisible(this.submitPage)){
//                 this.hidden(this.fixedNav);
//             }
//         }
//     }
//     toggleBtn(btns, p_about){
//         if(btns === 'open'){
//             this.submitPage.style.display = 'block';
//             this.initialPage.style.display = 'none';
//         }
//         if(btns === 'close'){
//             this.submitPage.style.display = 'none';
//             this.initialPage.style.display = 'block';
//             if(scrollY < p_about.offsetTop + p_about.offsetHeight/2)
//                 this.fixedNav.style.opacity = '0';
//         }
//     }
//     show(el){
//         el.style.transform= 'translateY(0%)';
//         el.style.opacity= '1';
//     }
//     hidden(el){
//         el.style.transform= 'translateY(-200%)';
//         el.style.opacity= '0';  
//     }
// }

// export { Plans };

