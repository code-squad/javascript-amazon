class RenderTemplate {
  constructor(parentElement, getTemplate) {
    this.parentElement = document.querySelector(parentElement);
    this.getTemplate = getTemplate;
  }

  makeTemplate(data) {
    console.log(this.getTemplate(data))
    return this.getTemplate(data);
  }

  rendering(dataArr) {
    dataArr
    .map(data => this.makeTemplate(data))
    .forEach(template => this.parentElement.insertAdjacentHTML('beforeend', template));
  }
}

export default RenderTemplate;