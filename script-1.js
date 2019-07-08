import data from './data.js';


class Carousel {
    constructor(data) {
        this.htmlContent = data;
        // this.position = 0;
        this.wrapper = document.querySelector('.content-wrapper');
        this.arrows = document.querySelectorAll('.right-arrow, .left-arrow');
        this.navBar = document.querySelector('.navigation-bar');
        this.item = document.querySelector('.content-section');
        this.menuBar = Array.from(this.navBar.children)             
    }
    
    init() {
        this.render(this.htmlContent);
        this.registerEvent();
        this.mainContent = document.querySelector('.main-content');
        this.contentWidth = this.mainContent.offsetWidth;    
        this.fullWidth = this.contentWidth * (this.htmlContent.length - 1);
        this.position = -this.contentWidth;   
        this.wrapper.style.transform = `translate3d(${this.position}px, 0, 0)`;
    }

    render (data) {
        data.forEach((el, i) => {
            let templete = `
                <div class="main-content" data-index="${i}">
                <div class="content-img">
                    <img src="${el.img}" alt="">
                </div>
                <div class="text-content">
                    <p>${el.title}</p>
                    <ul>
                        ${el.text}
                    </ul>
                </div>
                `;
            this.wrapper.insertAdjacentHTML('beforeend', templete)
        })
    }

    registerEvent () {
        const [leftArrow, rightArrow] = this.arrows
        leftArrow.addEventListener('click', this.carouselPrev.bind(this))
        rightArrow.addEventListener('click', this.carouselNext.bind(this))
        this.navBar.addEventListener('click', this.carouselNavbar.bind(this))
        this.wrapper.addEventListener('transitionend', this.moveWithoutTransition.bind(this))
        this.wrapper.addEventListener('transitionend', this.scaleNavbar.bind(this))
    }

    carouselPrev () {
        if (this.position < 0) {
            this.position += this.contentWidth;
            this.move()
        }
    }

    carouselNext () {
        if(this.position > -this.fullWidth)
        this.position -= this.contentWidth;
        this.move();
    }

    move() {
        this.wrapper.style.transition = '400ms'
        this.wrapper.style.transform = `translate3d(${this.position}px, 0, 0)`;
    }

    moveWithoutTransition() {
        if (this.position === 0) {
            this.position = -this.contentWidth * 4
            this.wrapper.style.transition = ''
            this.wrapper.style.transform = `translate3d(${this.position}px, 0, 0)`;
        } else if ( this.position === -this.contentWidth * (data.length -1)) {
            this.position = -this.contentWidth * 1
            this.wrapper.style.transition = ''
            this.wrapper.style.transform = `translate3d(${this.position}px, 0, 0)`;
        }
    }

    scaleNavbar () {
        const contentIndex = -this.position/this.contentWidth - 1
        this.menuBar.forEach(item => {
            item.classList.remove('scale')
        })
        this.menuBar[contentIndex].classList.add('scale')
    }

    carouselNavbar(event) {
        const menuIndex = event.target.dataset.index
        console.log(event.target)
        this.position = -this.contentWidth * menuIndex;
        this.move()
        }
    }

const content = new Carousel(data)
content.init();