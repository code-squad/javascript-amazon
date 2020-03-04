const SearchController = function SearchController(searchView, searchModel) {
  this.searchView = searchView;
  this.searchModel = searchModel;
};

SearchController.prototype.initialize = function initialize() {
  const searchBarElem = this.searchView.searchBar;
  const searchBtnElem = this.searchView.searchBtn;
  const inputElem = this.searchView.searchInput;

  this.addTimerEventListener("input", inputElem);

  inputElem.addEventListener("focusout", () => {
    this.searchView.clearList();
  });

  searchBtnElem.addEventListener("click", () => {
    this.searchView.clearList();
  });

  searchBarElem.addEventListener("keydown", evt => {
    this.keyDownCallback(evt);
  });
};

SearchController.prototype.keyDownCallback = function keyDownCallback(evt) {
  const listArray = this.searchView.searchList.children[0].children;
  if (!listArray.length) return;
  const [ARROW_UP, ARROW_DOWN, ENTER] = ["ArrowUp", "ArrowDown", "Enter"];
  switch (evt.key) {
    case ARROW_UP:
      this.searchView.listIndex -= 1;
      if (this.searchView.listIndex < 0) this.searchView.listIndex = listArray.length - 1;
      this.searchView.highlightList(listArray);
      break;
    case ARROW_DOWN:
      this.searchView.listIndex += 1;
      if (this.searchView.listIndex > listArray.length - 1) this.searchView.listIndex = 0;
      this.searchView.highlightList(listArray);
      break;
    case ENTER:
      this.searchView.clearList();
      break;
    default:
      break;
  }
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
  if (!currentText) this.searchView.clearList();
  else this.searchModel.fetchList(currentText, this.showList.bind(this));
};

SearchController.prototype.showList = function showList(wordsFromModel) {
  this.searchView.templateList(wordsFromModel);
  if (wordsFromModel.length > 0) {
    this.searchView.addClass();
    this.searchView.listIndex = this.searchView.LI_INIT_VAL;
  } else this.searchView.clearList();
};

export default SearchController;
