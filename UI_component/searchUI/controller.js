class Controller {
  constructor(obj) {
    this.data;
    this.filterdData = [];
    this.searchView = obj.searchView;
    this.autoCompleteView = obj.autoCompleteView;
    this.recentSearchView = obj.recentSearchView;

    this.currentMode;
    this.modeType = {
      focusing: "focusing",
      blured: "blured",
      pending: "pending",
      entering: "entering",
      completing: "completing"
    };
  }

  getData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.data = data;

        this.initController();
        this.initSearchView();
        this.initAutoCompleteView();
        this.initRecentSearchView();
      });
  }

  initController() {
    this.currentMode = "pending";

    document.addEventListener("keydown", e => {
      if (this.currentMode === "focusing") {
        this.recentSearchView.updateHighlight(e.code);
      } else if (this.currentMode === "entering") {
        this.autoCompleteView.updateHighlight(e.code);
      }
    });

    this.autoCompleteView.hideModalWindow();
    this.recentSearchView.hideModalWindow();
  }

  initSearchView() {
    this.searchViewHandler = this.searchViewHandler.bind(this);
    this.searchView.init(this.searchViewHandler, this.modeType);
  }

  initAutoCompleteView() {
    this.autoCompleteHandler = this.autoCompleteHandler.bind(this);
    this.autoCompleteView.init(this.autoCompleteHandler);
  }

  initRecentSearchView() {
    this.recentSearchViewHandler = this.recentSearchViewHandler.bind(this);
    this.recentSearchView.init(this.recentSearchViewHandler);
  }

  searchViewHandler(changedmode, inputValue) {
    this.currentMode = changedmode;

    if (this.currentMode === "entering") {
      this.recentSearchView.hideModalWindow();

      const targetLength = inputValue.length;
      const baseData = [...this.data.product];

      this.filterdData = baseData.filter(
        data => data.slice(0, targetLength) === inputValue
      );
      this.autoCompleteView.makeliTemplate(this.filterdData);
    } else if (this.currentMode === "completing") {
      this.autoCompleteView.currentHighlightIndex = -1;
      this.recentSearchView.saveRecentKeyword(inputValue);
    } else if (this.currentMode === "pending") {
      this.autoCompleteView.hideModalWindow();
    } else if (this.currentMode === "focusing") {
      this.recentSearchView.makeliTemplate();
    } else if (this.currentMode === "blured") {
      this.autoCompleteView.hideModalWindow();
      this.recentSearchView.hideModalWindow();
    }
  }

  autoCompleteHandler(selectedKeyword) {
    this.searchView.updateSearchKeyword(selectedKeyword);
  }

  recentSearchViewHandler(selectedKeyword = "") {
    if (selectedKeyword === "") {
      this.currentMode = "pending";
      this.autoCompleteView.hideModalWindow();
      this.searchView.removeSearchKeyword();
    } else {
      this.searchView.updateSearchKeyword(selectedKeyword);
    }
  }
}

export default Controller;
