let jsonData = [];

const fetchData = () => {
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(json => {
      jsonData = [...json];
    });
};

const makeAndAppendDom = () => {
  let domSectionDiv = document.querySelector('.dom-section');

  jsonData.map((data) => {
    let wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'wrapper';

    let postIdDiv = document.createElement('div');
    let postIdContent = document.createTextNode(`postId = ${data.postId}`);
    postIdDiv.appendChild(postIdContent);
    wrapperDiv.appendChild(postIdDiv);
    postIdDiv.className = 'post-id';

    let idDiv = document.createElement('div');
    let idContent = document.createTextNode(`id = ${data.id}`);
    idDiv.appendChild(idContent);
    wrapperDiv.appendChild(idDiv);
    idDiv.className = 'id';


    let nameDiv = document.createElement('div');
    let nameContent = document.createTextNode(`name = ${data.name}`);
    nameDiv.appendChild(nameContent);
    wrapperDiv.appendChild(nameDiv);
    nameDiv.className = 'name'


    let emailDiv = document.createElement('div');
    let emailContent = document.createTextNode(`emial = ${data.email}`);
    emailDiv.appendChild(emailContent);
    wrapperDiv.appendChild(emailDiv);


    let bodyDiv = document.createElement('div');
    let bodyContent = document.createTextNode(`body = ${data.body}`);
    bodyDiv.appendChild(bodyContent);
    wrapperDiv.appendChild(bodyDiv);

    domSectionDiv.appendChild(wrapperDiv);
  })
};

