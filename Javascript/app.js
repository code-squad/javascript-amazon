/** Common **/
import {qS} from "./koon.js";

/** Carousel App **/
import MainController from "./Carousel/controllers/mainController.js";
import Carousel from "./Carousel/views/carouselView.js";
import Arrows from "./Carousel/views/arrowsView.js";
import CardNavi from "./Carousel/views/cardNaviView.js";

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
mainController.init();

/** Search App **/
import SearchController from "./Search/controllers/searchController.js";
import SearchForm from "./Search/views/searchForm.js"; 
import AutoList from "./Search/views/autoList.js";
import RecentList from "./Search/views/recentList.js";
import autoModel from "./Search/models/autoModel.js"
import RecentModel from "./Search/models/recentModel.js";

const el = qS('.searchBox');
const searchForm = new SearchForm(el);
const autoList = new AutoList(el);
const recentList = new RecentList(el);
const recentModel = new RecentModel();

const searchController = new SearchController(searchForm, autoList, recentList, recentModel, autoModel);
searchController.init();





























// import mediator from "./mediator.js";

// mediator.init('.card-wrap', {
//   infinite : true,
//   speed : 1000,
//   arrows : true,
//   cardNavigation : '.card-navigation'   
// })



