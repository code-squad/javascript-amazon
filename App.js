import Carousel from './Carousel.js';
import Navigation from './Naviagtion.js';
import Controller from './Controller.js';
const leftBtn = document.querySelector(".contents__button_left");
const rightBtn = document.querySelector(".contents__button_right");
// ol태그로 잡는것보다 querySelecterAll로 nodeList를 잡는게 더 좋은 방법인듯! 
const cardList = document.querySelector(".carousel__contents > ol");
const navbar = document.querySelector(".carousel__title");
const animationTime = 200;

fetch("./localData.json")
.then(response=>response.json())
.then((contentsData)=>{
    const carousel = new Carousel({ leftBtn, rightBtn, cardList, animationTime,contentsData  });
    const navigation = new Navigation({ navbar,contentsData  });
    const amazonController = new Controller({ carousel, navigation ,animationTime});
    
    amazonController.init();
})





