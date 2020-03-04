import { SearchBox } from "./searchBox.js";
import { AutoComplete } from "./autoComplete.js";
import { TemplateData } from "./templateData.js";

const jsonFileUrl = "../../../server/productData.json";
// const jsonFileUrl = "http://localhost:8080/product";
const data = localStorage.getItem("mockData");

const controllData = data => {
  new SearchBox();
};

(() => {
  fetch(jsonFileUrl)
    .then(response => response.json())
    .then(mockData => {
      localStorage.setItem("mockData", JSON.stringify(mockData));
    })
    .then(() => {
      new TemplateData();
    })
    .then(() => {
      controllData(data);
    });
})();
