const navList = document.querySelector(".navigation-list");
const carousel = document.querySelector(".carousel");

function test(arr) {
  let result = arr.reduce((acc, cur) => {
    acc += `<li>${cur}</li>`;
    return acc;
  }, "");
  return result;
}

function insertNavdata(data) {
  let result = data.reduce((acc, cur) => {
    acc += `<li class="item${cur.id}">${cur.title}</li>`;
    return acc;
  }, "");

  navList.insertAdjacentHTML("beforeend", result);
}

function insertCarouseldata(data) {
  let result = data.reduce((acc, cur) => {
    acc += `<li class="carousel-item"><div class="info-img"><img src="${
      cur.imgurl
    }"></div><div class="info-text"><h3>${cur.subtitle}</h3><ul>${test(
      cur.desc
    )}</ul></div></li>`;
    return acc;
  }, "");

  console.log(result);
  carousel.insertAdjacentHTML("beforeend", result);
}

function requestData(url) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      insertNavdata(data);
      insertCarouseldata(data);
    })
    .catch(error => console.log(error));
}
requestData("./resources/data/carouselData.json");
