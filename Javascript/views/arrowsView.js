import koon from "../koon.js";
const {qS, deleteAnimation, addClass, removeClass} = koon;

class Arrows {
    constructor() {
        this.arrowsEvent = null;
    }

    render(target) {
        console.log("arrows rendering...");
        let createdNode = this.getArrowsHTML();

        createdNode.forEach((v) => {
            target.innerHTML += v;    
        })
    }

    getArrowsHTML() {
        let prevBtn = `<img src="./images/left-chevron.svg" alt="" class="btn-common btn-prev"/>`;
        let nextBtn = `<img src="./images/right-chevron.svg" alt="" class="btn-common btn-next"/>`;

        return [prevBtn, nextBtn]
    }    

    init() {
        console.log("arrows initiating...");
        this.prevBtn = qS(".btn-prev");
        this.nextBtn = qS(".btn-next");
        this.bindEvents()
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => {
            this.arrowsEvent({detail : "@prev"});
        })

        this.nextBtn.addEventListener('click', () => {
            this.arrowsEvent({detail : "@next"});
        })
    }
}

export default Arrows;

