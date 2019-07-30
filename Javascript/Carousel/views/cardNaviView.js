import {qS, addClass, removeClass} from "../../koon.js";

class CardNavi {
    constructor(option, data) {
        this.option = option;
        this.data = data;
        this.el = qS(this.option.cardNavi);
        this.mainEvent = null;
        this.setItemAttribute = null;
    }

    init(data) {
        this.render(data)
        this.setValues();
        this.setItemAttribute({
            'target' : this.naviItems,
            'attrName' : 'data-navi-index',
            'subject' : 'cardNavi'
        });
        this.naviItems[0].classList.add("scale");
        this.bindEvents();
    }

    render(data) {
        let createdNode = data.reduce((bef, aft) => {
            bef += `<li>${aft.navTitle}</li>`
            return bef;
        }, '<ul class="card-navi-list">') + '</ul>'

        this.el.innerHTML = createdNode;
    }

    setValues() {
        this.naviList = qS('.card-navi-list');
        this.naviItems = this.naviList.children;
    }

    bindEvents() {
        this.naviList.addEventListener("click", (e) => {
            if(e.target.tagName === 'LI') {
                this.mainEvent({
                    'detail' : '@cardNavi',
                    'target' : e.target.dataset.naviIndex
                });
            }
        })
    }

    scaleUp(idx) {
        let currentScale = qS(".scale");
        currentScale.classList.remove("scale");
        this.naviItems[idx - 1].classList.add("scale");
    }
}

export default CardNavi;