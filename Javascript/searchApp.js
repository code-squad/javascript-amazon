import {qS} from "./koon.js";
import SearchController from "./Search/controllers/searchController.js";
import SearchForm from "./Search/views/searchForm.js"; 
import AutoList from "./Search/views/autoList.js";
import RecentList from "./Search/views/recentList.js";
import AutoModel from "./Search/models/autoModel.js"
import RecentModel from "./Search/models/recentModel.js";

class SearchApp {
    constructor() {
        this.recentModelMaxNumber = 5;
        this.apiUrl = "https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/amazon_autocomplete?query=";
        
        this.el = qS('.searchBox');
        this.searchForm = new SearchForm(this.el);
        this.autoList = new AutoList(this.el);
        this.recentList = new RecentList(this.el);
        this.recentModel = new RecentModel(this.recentModelMaxNumber);
        this.autoModel = new AutoModel(this.apiUrl);        
        this.searchController = new SearchController(
            this.searchForm, 
            this.autoList, 
            this.recentList, 
            this.recentModel, 
            this.autoModel
        );
    }

    run() {
        this.searchController.init();
    }
}

export default SearchApp;