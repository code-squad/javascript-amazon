// Controller : 뷰와 모델 사이에서 컨트롤. 이벤트 처리를 담당. 모델로부터 데이터를 가져와서 뷰에게 전달한다.
// View: DOM을 조작하는 모든 일을 도맡아서 한다.
// Model: 서버에서 JSON 데이터를 가져오는 일을 한다.

const SearchController = function SearchController(searchView, searchModel) {
  this.searchiew = searchView;
  this.searchModel = searchModel;
};

SearchController.prototype.initialize = function initialize() {
  // 키보드 입력 이벤트 등록
};

SearchController.prototype.showList = function showList(searchModelData) {
  // 모델에서 데이터를 가져와 뷰가 이해할 수 있는 객체로 변경
  // 뷰가 계산과정을 마치고 렌더링하도록 뷰에 지시
  this.searchiew.render(searchModelData);
};

const SearchView = function SearchView(element) {
  this.element = element;
};

SearchView.prototype.render = function render(viewModel) {
  // 가져온 viewModel 내용을 바탕으로 innerHTML 객체를 변경
};

const SearchModel = function SearchModel() {};

SearchModel.prototype.getList = function getList() {
  // json 데이터를 가져오는 과정
};
