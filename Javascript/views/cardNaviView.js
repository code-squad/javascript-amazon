import koon from "../koon.js";
const {qS, addClass, removeClass} = koon;

class CardNavi {
    constructor(option, data) {
        this.option = option;
        this.data = data;
        this.el = qS(this.option.cardNavi);
        this.mainEvent = null;
        this.setItemAttribute = null;
    }

    render(data) {
        this.el.innerHTML = `<ul class="card-navi-list"></ul>`;
        let target = this.el.querySelector('.card-navi-list');
        let createdNode;

        data.forEach((v) => {
            createdNode = `<li class="card-navi-item">${v.navTitle}</li>`;
            target.innerHTML += createdNode;
        })        
    }

    init() {
        this.setValues();
        this.setItemAttribute({
            'target' : this.naviItems,
            'attrName' : 'data-navi-index',
            'subject' : 'cardNavi'
        });
        this.naviItems[0].classList.add("scale");
        this.bindEvents();
    }

    setValues() {
        this.naviList = qS('.card-navi-list');
        this.naviItems = this.naviList.children;
    }

    bindEvents() {
        this.naviList.addEventListener("click", (e) => {
            this.mainEvent({
                'detail' : '@cardNavi',
                'target' : e.target.dataset.naviIndex
            });
        })
    }

    scaleUp(idx) {
        let currentScale = document.querySelector(".scale");
        currentScale.classList.remove("scale");
        this.naviItems[idx - 1].classList.add("scale");
    }
}

export default CardNavi;