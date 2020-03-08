import { SearchBox } from "./searchBox.js";
import { AutoComplete } from "./autoComplete.js";
import { TemplateData } from "./templateData.js";

const jsonFileUrl = "../../../server/productData.json";
const data = localStorage.getItem("mockData");

const controllData = data => {
  const searchBox = new SearchBox();
  const autoComplete = new AutoComplete(JSON.parse(data));
  const searchTerm = document.querySelector(".search-term");
  const DELAY_TIME = 300;

  searchTerm.addEventListener("input", event => {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      let input = event.target.value;
      searchBox.inputEventListener(input);
      autoComplete.searchChar(input);
    }, DELAY_TIME);
  });
};

(() => {
  fetch(jsonFileUrl)
    .then(response => response.json())
    .then(mockData => {
      localStorage.setItem("mockData", JSON.stringify(mockData));
    })
    .then(() => new TemplateData())
    .then(() => controllData(data));
})();
