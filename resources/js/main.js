import SearchView from "./view.js";
import SearchModel from "./model.js";
import SearchController from "./controller.js";

window.addEventListener("DOMContentLoaded", () => {
  const searchView = new SearchView();
  const searchModel = new SearchModel("../data/localData.json");
  const searchController = new SearchController(searchView, searchModel);
  searchController.initialize();
});
