import MakeTemplate from "./template.js";
import Carousel from "./carousel.js";
import Pagination from "./pagination.js";

const cardRequest = new Request('http://127.0.0.1:5500/localData.json');
fetch(cardRequest)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const makeTemplate = new MakeTemplate();
    
    makeTemplate.init(data);
  })
  .then(() => {
    const pagination = new Pagination();
    const carousel = new Carousel(".carousel", {
      infinite: true,
      speed: 1000
    });  

    carousel.init(pagination);
    pagination.init(carousel);
  }) 




