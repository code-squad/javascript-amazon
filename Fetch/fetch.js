const dataURL = "./localData.json";
const targetId = "1c3d42";

const findByTargetId = data => data.find(item => item._id === targetId);
const render = items => {
  return items.map(item => {
    const li = document.createElement("li");
    li.innerHTML = `
        <h2>${item.title}</h2>
        <p>${item.desc}</p>
        <img src="${item.imgName}"/>
      `;
    return li;
  });
};

fetch(dataURL)
  .then(response => response.json())
  .then(data => {
    const carouselData = findByTargetId(data);
    const listItems = render(carouselData.list);
    const ul = document.querySelector(".carousel");
    return listItems.forEach(li => ul.appendChild(li));
  });
