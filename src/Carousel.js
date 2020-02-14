class Carousel {
  imageSrc;
  title;
  description;
  link;
  linkContent;

  constructor(props) {
    this.imageSrc = props.imageSrc;
    this.title = props.title;
    this.description = props.description;
    this.link = props.link;
    this.linkContent = props.linkContent;
  }

  render() {
    return this.createElementFromHTML(`
      <div class="card-navigation-details-wrapper">
        <img class="card-navigation-details-image" src="${this.imageSrc}" alt="">
          <div class="card-navigation-details-desc-wrapper">
            <div class="card-navigation-details-desc-title">${this.title}</div>
            <ul class="card-navigation-details-desc-text-wrapper">
              <li class="card-navigation-details-desc-text">${this.description}</li>
            </ul>
            <a href="${this.link}">${this.linkContent}</a>
        </div>
      </div>
    `);
  }

  createElementFromHTML(htmlStr) {
    const div = document.createElement('div');
    div.innerHTML = htmlStr.trim();

    return div.firstChild;
  }
}