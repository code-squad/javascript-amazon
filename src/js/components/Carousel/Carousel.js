import { Helpers, $ } from '../../util/Helpers';
import { ajax } from '../../util/ajax';

class Carousel{
    constructor({delay}){
        this.H = new Helpers();
        this.pNum = 0;
        this.timeoutId = 0;
        this.delay = delay;
    }
    setEvent(data, els){
        els.nextBtn.addEventListener('click', ()=> this.controlSlides(data, els, 'next'));
        els.prevBtn.addEventListener('click', ()=> this.controlSlides(data, els, 'previous'));
        return this;
    }
    runAutoMove(data, els){
        this.controlSlides(data, els);
        this.timeoutId = setTimeout(() => this.runAutoMove(data, els), this.delay);
        return this;
    }
    controlSlides(data, els, direction= 'next', i=0){
        clearTimeout(this.timeoutId);
        this.setTextBox(data, els);
        this.setPageNumber(els, direction);
        for(let slide of els.slides){
            slide.style.transform = `translateX(${(100*(i-this.pNum))}%) translateY(${(-100*i)}%)`;
            i++;
        }
        return this;
    }
    setTextBox(data, els){
        els.heading.innerText = data[this.pNum].heading;
        els.paragraph.innerText = data[this.pNum].paragraph;
    }
    setPageNumber(els, direction){
        let pNum = this.pNum;
        let slidesNum = els.slides.length;
        if(direction === 'next'){
            pNum = (pNum+1 === slidesNum)? 0: pNum+1;
        } else if(direction === 'previous'){
            pNum = (!pNum)? slidesNum-1: pNum-1;
        }
        (Math.abs(this.pNum - pNum)>1)?
            this.H.removeClass(els.slides, 'transition'): this.H.addClass(els.slides, 'transition');
        this.pNum = pNum;
        return this;
    }
    render({httpMethod, url, els}){
        const parent = $('#exploreVideo');
        const tagName = 'li';
        const className = "carousel__item transition";
        return ajax({httpMethod, url}).then(res => {
            res.forEach((data, i) => {
                const el = this.H.createEl(parent, tagName, className);
                el.style.backgroundImage = `url(${data.imgurl})`;
                el.style.transform = `translateX(${(100*i)}%) translateY(${(-100*i)}%)`;
            });
            return res;
        }).then(res => {
            this.runAutoMove(res, els)
                .setEvent(res, els);
        })
    }
}

export { Carousel };