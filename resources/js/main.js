import { _$, _$$ } from "./util.js";

window.addEventListener("DOMContentLoaded", () => {
  const SearchView = function SearchView(element) {
    this.listElement = element;
  };

  SearchView.prototype.addClass = function addClass(statement, classNameArr) {
    classNameArr.forEach(eachClass => {
      _$(eachClass).classList.add(statement);
    });
  };

  SearchView.prototype.removeClass = function removeClass(statement, classNameArr) {
    classNameArr.forEach(eachClass => {
      _$(eachClass).classList.remove(statement);
    });
  };

  SearchView.prototype.templateList = function templateList(viewModel) {
    // 가져온 viewModel 내용을 바탕으로 innerHTML 객체를 변경
  };

  // Model

  const SearchModel = function SearchModel(src) {
    this.src = src;
  };

  SearchModel.prototype.getList = function getList(str, fn) {
    fetch(this.src)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(str);
        // console.log(this.pickWord(str, data));
      });
    fn();
    // json 데이터를 가져오는 과정
  };

  SearchModel.prototype.pickWord = function pickWord(str, data) {};
  // Controller

  const SearchController = function SearchController(searchView, searchModel) {
    this.searchView = searchView;
    this.searchModel = searchModel;
  };

  SearchController.prototype.initialize = function initialize() {
    const inputClass = ".search-input";
    const targetClassList = [".search", ".line", ".search-list"];
    let timeout = null;

    _$(inputClass).addEventListener("input", evt => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.inputCallback(evt, targetClassList);
      }, 300);
    });

    _$(inputClass).addEventListener("focusout", () => {
      this.searchView.removeClass("active", targetClassList);
    });
  };

  SearchController.prototype.inputCallback = function inputCallback(evt, targetClassList) {
    const currentText = evt.target.value;
    if (!currentText) this.searchView.removeClass("active", targetClassList);
    else {
      this.searchView.addClass("active", targetClassList);
      this.searchModel.getList(currentText, this.showList.bind(this));
    }
  };

  SearchController.prototype.showList = function showList(searchModelData) {
    // 모델에서 데이터를 가져와 뷰가 이해할 수 있는 객체로 변경
    // 뷰가 계산과정을 마치고 렌더링하도록 뷰에 지시
    // this.searchView.templateList(searchModelData);
  };

  const targetElement = _$(".search-list");
  const searchView = new SearchView(targetElement);
  const searchModel = new SearchModel("../data/localData.json");
  const searchController = new SearchController(searchView, searchModel);
  searchController.initialize();
});
