import SearchView from "./View/SearchView.js";
import RecentModel from "./Model/RecentModel.js";
import RecentController from "./Controller/RecentController.js";

window.addEventListener("DOMContentLoaded", () => {
  const autoComplete = document.querySelector(".autocomplete");

  const searchView = new SearchView(autoComplete);
  const recentModel = new RecentModel({ maxLen: 5 });
  const recentController = new RecentController({
    model: recentModel,
    view: searchView
  });
});
