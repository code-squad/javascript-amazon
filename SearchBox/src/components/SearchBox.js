class SearchBox {
  constructor() {
    this.click();
  }
  click() {
    const element = document.querySelector("#inputBox");
    element.addEventListener("keyup", event => {
      console.log(event.keyCode);
    });
  }
}

export default SearchBox;
