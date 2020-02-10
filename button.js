class Button {
  constructor(buttonData) {
    this.buttonData = buttonData;
  }

  render() {
    return this.buttonData.reduce(
      (result, data) => (result += `<button>${data}</button>`),
      ""
    );
  }
}
