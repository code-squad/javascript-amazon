// prettier-ignore
/*eslint-disable */

const carouselMain = data =>
  ` 
  <div class="carousel__main">
    <div class="carousel__container">
    ${data.carouselMain.reduce((acc, curr) => {
      return (acc += 
      `<div class="carousel__item">
          <div class="carousel__item--image">
              <img src="${curr.imgAdress}" alt="">
          </div>
          <div class="carousel__item--contents">
              <div class="carousel__item--contents-wrapper">
                  <h3>${curr.title}</h3>
                  <p>${curr.desc}</p>
              </div>
          </div>
        </div>`);
    }, '')}
    </div>
  </div>
`;

export default carouselMain;
