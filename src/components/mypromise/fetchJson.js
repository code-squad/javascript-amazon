fetch('./localData.json')
.then(data => data.json())
.then(json => console.log(json));