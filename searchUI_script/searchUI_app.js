import Model from "./Model/model.js";
import View from "./View/view.js";
import Controller from "./Controller/controller.js";


document.addEventListener('DOMContentLoaded', () => {
  const model = new Model({
    span: document.querySelector('#searchbar_form'),
    search: document.querySelector(".search-tab")
  })
  model.init();
  const view = new View();
  new Controller(view, model);
})

