const dataURL =
  "http://127.0.0.1:5500/javascript-amazon/FetchCarousel/localData.json";
const targetId = "1c3d42";

const findByTargetId = data => data.find(item => item._id === targetId);
const render = items =>
  items.reduce((acc, item) => {
    acc += `<li>
      <h2>${item.title}</h2>
      <p>${item.desc}</p>
      <img src="${item.imgName}"/>
    </li>`;
    return acc;
  }, "");

fetch(dataURL)
  .then(response => response.json())
  .then(data => {
    const carouselData = findByTargetId(data);
    const ul = document.querySelector(".carousel");
    ul.innerHTML = render(carouselData.list);
  });
