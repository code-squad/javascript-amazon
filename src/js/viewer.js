class Viewer {
  constructor({container}) {
    this.contentCard = document.querySelector(container); 
  }

  fillTemplate(data) {
    return `
      <div class="carousel__item--image">
        <img src=${data.imgURL} alt="">
      </div>
      <div class="carousel__item--contents">
        <div class="carousel__item--contents-wrapper">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
        </div>
      </div>
    `
  }

  rendering(dataArray) {
    dataArray
    .map( content => this.fillTemplate(content))
    .forEach(filledTemplate => this.contentCard.innerHTML = filledTemplate)
  }
}