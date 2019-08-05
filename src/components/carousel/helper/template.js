export const getHeaderTemplate = header => {
  return `
    <li class="carousel__header--item" data-id=${header.id}>
      <p>${header.title}</p>
    </li>
  `
};

export const getMainTemplate = main => {
  return `
    <div class="carousel__item">
      <div class="carousel__item--image">
        <img src=${main.imgURL} alt=${main.title}>
      </div>
      <div class="carousel__item--contents">
        <div class="carousel__item--contents-wrapper">
            <h3>${main.title}</h3>
            <p>${main.description}</p>
        </div>
      </div>
    </div>
  `
};