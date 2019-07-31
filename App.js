import CarouselView from "./Carousel/CarouselView.js";
import NavigationView from "./Carousel/NaviagtionView.js";
import CarouselController from "./Carousel/CarouselController.js";

import SearchController from "./Search/SearchController.js";
import InputView from "./Search/InputView.js"
import MatchedView from "./Search/MatchedView.js"
import SearchModel from "./Search/SearchModel.js"
import HistoryView from "./Search/HistoryView.js"

const leftBtn = document.querySelector(".contents__button_left");
const rightBtn = document.querySelector(".contents__button_right");
const cardList = document.querySelector(".carousel__contents");
const navbar = document.querySelector(".carousel__title");
const animationTime = 200;
const dataURL = "./Carousel/CarouselLocalData.json";
const fetchURL = `https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/amazon_autocomplete?query=`

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
const matchedUl = ".searchbar__match";
const historyUl = ".searchbar__history";
const submitBtn = ".searchbar__right";

// {inputDiv} deconstructing 햇갈림. 
const inputView = new InputView({inputDiv,submitBtn});
const matchedView = new MatchedView({matchedUl});
const historyView = new HistoryView({historyUl});
const searchModel = new SearchModel({fetchURL});
const searchController = new SearchController({
  inputView,
  matchedView,
  historyView,
  searchModel
});
searchController.init();