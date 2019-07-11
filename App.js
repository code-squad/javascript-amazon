import CarouselView from "./CarouselView.js";
import NavigationView from "./NaviagtionView.js";
import Controller from "./Controller.js";
const leftBtn = document.querySelector(".contents__button_left");
const rightBtn = document.querySelector(".contents__button_right");
const cardList = document.querySelector(".carousel__contents");
const navbar = document.querySelector(".carousel__title");
const animationTime = 200;
const dataURL = "./localData.json";

const carouselView = new CarouselView({
  leftBtn,
  rightBtn,
  cardList,
  animationTime
});
const navigationView = new NavigationView({ navbar });
const amazonController = new Controller({
  carouselView,
  navigationView,
  animationTime
});
amazonController.init(dataURL);
