fetch('./localData.json')
  .then(reponse => reponse.json())
  .then(data => console.log(data))