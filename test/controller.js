class Controller {
  constructor(obj) {
    this.data;
    this.filterdData = [];
    this.searchView = obj.searchView;
    this.autoCompleteView = obj.autoCompleteView;
    this.recentSearchView = obj.recentSearchView;

    this.currentMode;
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
    this.searchView.init(this.searchViewHandler);
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

  recentSearchViewHandler(selectedKeyword = "") {
    if (selectedKeyword === "") {
      this.currentMode = "pending";
      this.autoCompleteView.hideModalWindow();
      this.searchView.removeSearchKeyword();
    } else {
      this.searchView.updateSearchKeyword(selectedKeyword);
    }
  }

  autoCompleteHandler(selectedKeyword) {
    this.searchView.updateSearchKeyword(selectedKeyword);
  }

  initFindBtn() {
    this.findBtn.addEventListener("click", () => {
      // 현재 input창에 들어 있는 value 추출
      // value를 최그느 검색 데이터에 저장
    });
    //event 등록
    // click 했을 때, input창에 입력된 data를 최근 검색 데이터에 저장하는 함수를 호출한다.
    //
  }

  saveRecentkeyword() {}
}

export default Controller;
