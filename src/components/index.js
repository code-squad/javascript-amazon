import search from './search/main.js';
import carousel from './carousel/main.js';


const getCarouselData = async () => 
  await fetch('/json/localData.json').then(data => data.json());

window.addEventListener('DOMContentLoaded', () => {
  const localData = getCarouselData();

  localData
    .then(json => {
      carousel(json);
    });

    search();
})