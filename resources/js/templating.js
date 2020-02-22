window.addEventListener("DOMContentLoaded", () => {
  fetch("../data/localData.json")
    .then(res => res.json())
    .then(data => {
      const carouselItem = data[0];
      const carouselBtn = data[1];
      const carouselCard = data[2];

      const item = {
        name: carouselItem.name,
        title: getValuefromData(carouselItem.list, `title`),
        desc: getValuefromData(carouselItem.list, `desc`),
        imgSrc: getValuefromData(carouselItem.list, `imgSrc`),
      };

      function getValuefromData(obj, str) {
        const newData = [];
        for (let key in obj) {
          newData.push(obj[key][str]);
        }
        return newData;
      }

      function makeClassName(str) {
        return new Object({
          name: str,
          container: `${str}-container`,
          ul: `${str}-list`,
          li: `${str}-item`,
          imgArea: `${str}-img-area`,
          content: `${str}-content`,
        });
      }

      function renderSlider(strObj, data) {
        let resultHTML = "";
        let cardItem = "";
      }
    });
});
