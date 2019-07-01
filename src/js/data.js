class Data {
  constructor() {
    this.state = [];
  }

  getData(url) {
    fetch(url)
    .then(data => data.json())
    .then(json => this.setState(json));
  }

  setState(data) {
    this.state = [...this.state, data];
  }
}