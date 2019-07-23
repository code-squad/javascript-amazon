import {qS, addClass, removeClass} from "../../koon.js";

class Arrows {
    constructor() {
        this.arrowsEvent = null;
    }

    init(target) {
        this.render(target);
        this.prevBtn = qS(".btn-prev");
        this.nextBtn = qS(".btn-next");
        this.bindEvents()
    }

    render(target) {
        let createdNode = this.getArrowsHTML();

        createdNode.forEach((v) => {
            target.innerHTML += v;    
        })

        this.btnList = qS('.btn-wrap')
    }

    getArrowsHTML() {
        let btnList = `
            <ul class="btn-wrap">
                <li>
                    <img src="./images/left-chevron.svg" alt="" class="btn-common btn-prev"/>
                </li>
                <li>
                    <img src="./images/right-chevron.svg" alt="" class="btn-common btn-next"/>
                </li>
            </ul>`

        return [btnList];
    }    

    bindEvents() {
        this.btnList.addEventListener('click', (evt) => {
            if(evt.target.tagName !== 'IMG') return;
            let targetClassName = evt.target.classList[1] 
            this.detailEvent(targetClassName);
        })
    }

    detailEvent(evt) {
        if(evt === 'btn-prev') {
            this.arrowsEvent({detail : "@prev"});
        } else {
            this.arrowsEvent({detail : "@next"});
        }
    }
}

export default Arrows;

