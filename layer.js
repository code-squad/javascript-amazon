export default class PlansUI {
    constructor() {
        this.isExtenderShown = false;
        this.closeExtenderBtn = document.querySelector('.plans-extender-btn');
        this.closeExtenderBtn2 = document.querySelector('.plans-extender-closeBtn')
        this.plansMoreBtn = document.querySelector('.plans-see-more');
        this.plansLayer = document.querySelector('.plans-layer');
        this.plansLayerWrapper = document.querySelector('.plans-wrapper');
        this.header = document.querySelector('.header');
        this.plansExtender = document.querySelector('.plans-extender');
        this.layerPosition = 366;
        this.headerPosition = 99;
    }

    showLayer() {
        this.isExtenderShown ? this.checkExtender() : this.showPlansLayer();
    };

    showPlansLayer() {
        if (window.scrollY > this.layerPosition) {
            // 스크롤이 366보다 아래면(PL shown 위치) : PL shown / header 'relative' 삭제 / PLW 'absolute -> fixed' 
            this.plansLayer.classList.add('shown');
            this.header.classList.remove('extended');
            this.plansLayerWrapper.classList.remove('closing');
        }

        else this.closePlansLayer();
    };

    closePlansLayer(){
        if (window.scrollY < this.headerPosition) {
            // 스크롤이 99보다 작으면(header위면) : PLW 'fixed -> absolute' / header 'relative' 추가 
            this.plansLayerWrapper.classList.add('closing');
            this.header.classList.add('extended');
        }
        else {
            // 헤더가 안보이면 : PL 닫기 / header 'relative 삭제' / PLW 'absolute -> fixed' 
            this.plansLayer.classList.remove('shown');
            this.header.classList.remove('extended');
            this.plansLayerWrapper.classList.remove('closing');
        }
    }

    checkExtender() {
        if (window.scrollY < this.headerPosition) {
            // 스크롤이 99보다 작으면(header위면) : PE 'absolute', 'top' 0 -> 6.5 rem (header 밑으로 내리기) / header 'relatvie'
            this.plansExtender.classList.add('top');
            this.header.classList.add('extended');
        } else {
            // 헤더 안보이면 : PE 'absolute' 삭제 / header 'relative' 삭제
            this.plansExtender.classList.remove('top');
            this.header.classList.remove('extended');
        }
    };

    showExtender() {
        // PL 가리고 PX 보여주고 flag 수정
        this.plansLayer.classList.remove('shown');
        this.plansExtender.classList.add('shown');
        this.isExtenderShown = true;
    };

    closeExtender() {
        if (window.scrollY > this.layerPosition) {
             // 스크롤이 366보다 아래면(PL shown 위치) : PE 가리고 PL 보여주고 PE top 없애주고 flag 수정 
            this.plansExtender.classList.remove('shown');
            this.plansLayer.classList.add('shown');
            this.plansExtender.classList.remove('top');
            this.isExtenderShown = false;
        } else {
            //  PL shown 위치보다 스크롤이 위면 : PE 가리고 PE top 없애주기 
            this.plansExtender.classList.remove('shown');
            this.plansExtender.classList.remove('top');
            this.isExtenderShown = false;
        }
    }
}