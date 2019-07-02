class Viewer {
  constructor({container}) {
    this.mainContent = document.querySelector(container);
  }

  getCompleteTemplate(data) {
    return `
      <div class="carousel__item">
        <div class="carousel__item--image">
          <img src=${data.imgURL} alt="">
        </div>
        <div class="carousel__item--contents">
          <div class="carousel__item--contents-wrapper">
              <h3>${data.title}</h3>
              <p>${data.description}</p>
          </div>
        </div>
      </div>
    `
  }

  rendering(dataArray) {
    dataArray
    .map( content => this.getCompleteTemplate(content))
    .forEach(filledTemplate => this.mainContent.insertAdjacentHTML('beforeend', filledTemplate));
  }
}

export default Viewer;