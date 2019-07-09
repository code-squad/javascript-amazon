export default class RecentController {
  constructor({ model, view }) {
    this._model = model;
    this._view = view;

    view.on("search", searchWord => this.updateRecentView(searchWord)); //검색어 입력 시, RecentModel에 데이터 추가
  }

  addSearchWord(searchWord) {
    this._model.push(searchWord);
  }

  updateRecentView(searchWord) {
    this.addSearchWord(searchWord);

    this._view.recentView.render(this._model.queue)
  }
}
