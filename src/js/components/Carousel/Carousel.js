import { Helpers } from '../../util/Helpers';
import { ajax } from '../../util/ajax';

class Carousel{
    constructor({delay}){
        this.H = new Helpers();
        this.pNum = 0;
        this.timeoutId = 0;
        this.delay = delay;
    }
    setEvent(els){
        els.nextBtn.addEventListener('click', ()=>{
            this.controlSlides(els.slides, 'next');
        });
        els.prevBtn.addEventListener('click', ()=>{
            this.controlSlides(els.slides, 'previous');
        });
        return this;
    }
    runAutoMove(slides){
        this.controlSlides(slides);
        this.timeoutId = setTimeout(() => this.runAutoMove(slides, this.delay), this.delay);
        return this;
    }
    controlSlides(slides, direction= 'next', i=0){
        clearTimeout(this.timeoutId);
        this.setPageNumber(slides, direction);
        for(let slide of slides){
            slide.style.transform = `translateX(${(100*(i-this.pNum))}%) translateY(${(-100*i)}%)`;
            i++;
        }
        return this;
    }
    setPageNumber(slides, direction){
        let pNum = this.pNum;
        let slidesNum = slides.length;
        if(direction === 'next'){
            pNum = (pNum+1 == slidesNum)? 0: pNum+1;
        } else if(direction === 'previous'){
            pNum = (!pNum)? slidesNum-1: pNum-1;
        }
        (Math.abs(this.pNum - pNum)>1)?
            this.H.removeClass(slides, 'transition'): this.H.addClass(slides, 'transition');
        this.pNum = pNum;
        return this;
    }
    render({httpMethod, url, parent, tagName, className}){
        return ajax({httpMethod, url}).then(res => {
            res.forEach((data, i) => {
                const el = this.H.createEl(parent, tagName, className);
                el.style.backgroundImage = `url(${data.imgurl})`;
                el.style.transform = `translateX(${(100*i)}%) translateY(${(-100*i)}%)`;
            });
            return parent;
        })
    }
}

export { Carousel };