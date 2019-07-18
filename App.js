import CarouselView from "./Carousel/CarouselView.js";
import NavigationView from "./Carousel/NaviagtionView.js";
import CarouselController from "./Carousel/CarouselController.js";

import SearchController from "./Search/SearchController.js";
import InputView from "./Search/InputView.js"
import MatchedView from "./Search/MatchedView.js"
// import HistoryView from "./Search/HistoryView.js"
import SearchModel from "./Search/SearchModel.js"

const leftBtn = document.querySelector(".contents__button_left");
const rightBtn = document.querySelector(".contents__button_right");
const cardList = document.querySelector(".carousel__contents");
const navbar = document.querySelector(".carousel__title");
const animationTime = 200;
const dataURL = "./Carousel/CarouselLocalData.json";
// const dataURL = "./data.json";

const carouselView = new CarouselView({
  leftBtn,
  rightBtn,
  cardList,
  animationTime
});
const navigationView = new NavigationView({ navbar });
const amazonController = new CarouselController({
  carouselView,
  navigationView,
  animationTime
});
amazonController.init(dataURL);

const inputDiv = ".searchbar__input";
const matchDiv = ".searchbar__match";
// const history = "searchbar__history";

//// {inputDiv} deconstructing 햇갈린다. 이렇게 보내면 받는거 맞나? 
const inputView = new InputView({inputDiv});
const matchedView = new MatchedView({matchDiv});
const searchModel = new SearchModel({});
const searchController = new SearchController({
  inputView,
  matchedView,
  searchModel
});
searchController.init();