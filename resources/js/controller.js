const SearchController = function SearchController(searchView, searchModel) {
  this.searchView = searchView;
  this.searchModel = searchModel;
};

SearchController.prototype.initialize = function initialize() {
  const searchBarElem = this.searchView.searchBar;
  const searchBtnElem = this.searchView.searchBtn;
  const inputElem = this.searchView.searchInput;
  let index = -1;

  this.addTimerEventListener("input", inputElem);

  inputElem.addEventListener("focusout", () => {
    this.searchView.removeClass();
  });

  searchBtnElem.addEventListener("click", () => {
    this.searchView.removeClass();
  });

  searchBarElem.addEventListener("keydown", evt => {
    this.keyDownCallback(evt, index);
    index = this.keyDownCallback(evt, index).index;
  });
};

SearchController.prototype.keyDownCallback = function keyDownCallback(evt, index) {
  let listIndex = index;
  const [ARROW_UP, ARROW_DOWN, ENTER] = ["ArrowUp", "ArrowDown", "Enter"];
  const listArray = this.searchView.searchList.children[0].children;
  switch (evt.key) {
    case ARROW_UP:
      listIndex -= 1;
      if (listIndex < 0) listIndex = listArray.length - 1;
      this.searchView.highlightList(listArray, listIndex);
      break;
    case ARROW_DOWN:
      listIndex += 1;
      if (listIndex > listArray.length - 1) listIndex = 0;
      this.searchView.highlightList(listArray, listIndex);
      break;
    case ENTER:
      this.searchView.removeClass();
      break;
    default:
      break;
  }
  return { index: listIndex };
};

SearchController.prototype.addTimerEventListener = function addTimerEventListener(eventName, inputElem) {
  let timeout = null;
  const DELAY_TIME = 300;
  inputElem.addEventListener(eventName, evt => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      this.inputCallback(evt);
    }, DELAY_TIME);
  });
};

SearchController.prototype.inputCallback = function inputCallback(evt) {
  const currentText = evt.target.value;
  if (!currentText) this.searchView.removeClass();
  else this.searchModel.getList(currentText, this.showList.bind(this));
};

SearchController.prototype.showList = function showList(wordsFromModel) {
  this.searchView.templateList(wordsFromModel);
  if (wordsFromModel.length > 0) this.searchView.addClass();
  else this.searchView.removeClass();
};

export default SearchController;
