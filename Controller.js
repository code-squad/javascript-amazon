import Carousel from './Carousel.js';
import Navigation from './Naviagtion.js';

class Controller {
    constructor({ carousel, navigation , animationTime }) {
        this.carousel = carousel;
        this.navigation = navigation;
        this.currentIndex = 0;
        this.previousIndex = undefined;
        this.animationTime = animationTime;
    }
    registerEvents() {
        this.carousel.leftBtn.addEventListener('click', this.carouselClickHandler.bind(this));
        this.carousel.rightBtn.addEventListener('click', this.carouselClickHandler.bind(this));
        this.navigation.navbar.forEach(
            (navItem,idx)=>{
                navItem.addEventListener('click',(e)=>
                    this.navItemClickHandler(e,idx)
                )
            }
        )
    }
    init() {
        this.currentIndex = this.makeRandomIndex();
        this.carousel.drawCardPosition(this.currentIndex);
        this.navigation.drawCurrentNavItem(this.currentIndex); 
        this.registerEvents();
    }
    carouselClickHandler(event) {
        const selectedDirection = event.target.id;
        event.preventDefault();
        this.moveIndex(selectedDirection);
        this.carousel.drawCardPosition(this.currentIndex,this.animationTime);
        this.navigation.drawCurrentNavItem(this.currentIndex,this.previousIndex); 
    }
    navItemClickHandler(e,idx){
        this.changeNavIndex(idx);
        this.navigation.drawCurrentNavItem(this.currentIndex,this.previousIndex);
        this.carousel.transformCard(this.currentIndex,this.previousIndex)
    }
    changeNavIndex(idx){
        this.previousIndex = this.currentIndex;
        this.currentIndex = idx;
    }

    moveIndex(direction) {
        this.previousIndex = this.currentIndex;
        let index =
            direction === "left" ? this.currentIndex - 1 : this.currentIndex + 1;
        if (index < 0) index += this.carousel.cardList.childElementCount;
        this.currentIndex = this.modCardLength(index);
    }
    modCardLength(number) {
        return number % this.carousel.cardList.childElementCount;
    }
    makeRandomIndex() {
        return Math.floor(Math.random() * (this.carousel.cardList.childElementCount - 1));
    }
}

const leftBtn = document.querySelector(".contents__button_left");
const rightBtn = document.querySelector(".contents__button_right");
// ol태그로 잡는것보다 querySelecterAll로 nodeList를 잡는게 더 좋은 방법인듯! 
const cardList = document.querySelector(".carousel__contents > ol");
const navbar = document.querySelectorAll(".carousel__title > ol > li");
const animationTime = 200;

const carousel = new Carousel({ leftBtn, rightBtn, cardList, animationTime });
const navigation = new Navigation({ navbar, animationTime });
const amazonController = new Controller({ carousel, navigation ,animationTime});

amazonController.init();