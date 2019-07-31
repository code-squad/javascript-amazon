/** Common **/
import {qS} from "./koon.js";

/** Carousel App **/
import MainController from "./Carousel/controllers/mainController.js";
import Carousel from "./Carousel/views/carouselView.js";
import Arrows from "./Carousel/views/arrowsView.js";
import CardNavi from "./Carousel/views/cardNaviView.js";

const url = 'https://kkw10.github.io//Javascript/Carousel/models/localData.json'
const element = qS('.card-wrap');
const option = {
  infinite : true,
  speed : 1000,
  arrows : true,
  cardNavi : '.card-navigation'    
}

const carousel = new Carousel(element, option);
const arrows = new Arrows();
const cardNavi = new CardNavi(option);

const mainController = new MainController(option, carousel, arrows, cardNavi)
mainController.init(url);

/** Search App **/
import SearchController from "./Search/controllers/searchController.js";
import SearchForm from "./Search/views/searchForm.js"; 
import AutoList from "./Search/views/autoList.js";
import RecentList from "./Search/views/recentList.js";
import AutoModel from "./Search/models/autoModel.js"
import RecentModel from "./Search/models/recentModel.js";

const recentModelMaxNumber = 5;
const apiUrl = "https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/amazon_autocomplete?query="

const el = qS('.searchBox');
const searchForm = new SearchForm(el);
const autoList = new AutoList(el);
const recentList = new RecentList(el);
const recentModel = new RecentModel(recentModelMaxNumber);
const autoModel = new AutoModel(apiUrl);

const searchController = new SearchController(searchForm, autoList, recentList, recentModel, autoModel);
searchController.init();





























// import mediator from "./mediator.js";

// mediator.init('.card-wrap', {
//   infinite : true,
//   speed : 1000,
//   arrows : true,
//   cardNavigation : '.card-navigation'   
// })



