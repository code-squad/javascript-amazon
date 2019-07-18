import { debounce } from '../../PLib/index.js';

class Model {
  constructor({ model }) {
    this.config = model;
    this.data = fetch(model.srcUrl).then(response => response.json());
    this.state = {};
    this.updateSuggesions = debounce(
      this.updateSuggesions.bind(this),
      model.delay,
    );
  }

  updateSuggesions({ value }) {
    // TODO 공백값이 들어오면 최근검색어를 보여주도록 세팅
    // if (value === '') this.resultView.return;
    const queryLowerCase = value.toLowerCase();
    if (this.data instanceof Promise) {
      this.data.then(data => {
        const { sort, maxResult } = this.config;
        const resList = data.filter(d => {
          const dataLowerCase = d.toLowerCase();
          return dataLowerCase.startsWith(queryLowerCase);
        });
        const list = resList.sort(sort).slice(0, maxResult);
        this.setState({
          query: value,
          suggesions: list,
        });
      });
    }
  }

  setState(updatedState) {
    Object.assign(this.state, updatedState);
    this.resultView.renderSuggestions(this.state);
  }
}

export default Model;
