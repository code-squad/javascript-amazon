import data from './data.js';


class MainContent {
    constructor(data) {
        this.data = data;
        this.position = 0;
        this.wrapper = document.querySelector('.content-wrapper');
        this.arrows = document.querySelectorAll('.right-arrow, .left-arrow');
        this.navBar = document.querySelector('.navigation-bar');
        this.item = document.querySelector('.content-section')
    }
    // wrapper 상위 엘리먼트 불러오기
    // 컨텐츠 엘리먼트 가로, 세로 넓이 불러오기
    // css 이동 속성 만들기 (transform, translate: 이동)
    init() {
        this.generateElement(this.data);
        this.registerEvent();
    }
    generateElement(data) {
        for (let i = 0; i < data.length; i++) {
            let templete = `
                <div class="main-content" data-index="${i}">
                <div class="content-img">
                    <img src="${data[i].img}" alt="">
                </div>
                <div class="text-content">
                    <p>${data[i].title}</p>
                    <ul>
                        ${data[i].text}
                    </ul>
                </div>
                `;
            this.wrapper.insertAdjacentHTML('beforeend', templete)
        }
    }

    registerEvent() {
        this.arrows[1].addEventListener('click', this.carouselArrow.bind(this))
        this.arrows[0].addEventListener('click', this.carouselArrow.bind(this))
        this.navBar.addEventListener('click', this.carouselNavbar.bind(this))
    }


    carouselArrow (event) {
        const arrow = event.target.parentNode.className[0]
        if ((this.position < 0 && arrow === 'l') || (this.position > -2700 && arrow === 'r')) {
            arrow === 'r' ? this.position -= 900 : this.position += 900
            this.wrapper.style.transform = `translate3d(${this.position}px, 0, 0)`;
        }
    }

    carouselNavbar(event) {
        const menuIndex = event.target.getAttribute('data-index')
        this.position = -900 * menuIndex;
        this.wrapper.style.transform = `translate3d(${this.position}px, 0, 0)`;
    }
}

const content = new MainContent(data)
content.init();