export default {
  getCarouselItemTempalte({ data }) {
    const list = data.map(eachData => eachData.desc);

    return `
        ${data.reduce(
          (html, item, index) => `
          ${html}
        <div class="item">
        <div class="thumb" style="background-image: url('${item.imgUrl}')">
        </div>
        <div class="content">
          <h2>${item.title}</h2>
          <ul>
            <li>${list[index]}</li>
          </ul>
        </div>
      </div>
        `,
          ``
        )}
        `;
  },

  getCarouselTemplate({ carouselItemHtml }) {
    return `
    <div class="item-wrapper">
      <div class="item-slider">${carouselItemHtml}</div>
    </div>
    <button class="carousel-control prev"><</button>
    <button class="carousel-control next">></button>
    `;
  },

  getNavigationTemplate({ data }) {
    return `
      <ul>
        ${data.reduce(
          (html, item, idx) => `
        ${html}
        <li data-itemnum=${idx + 1}>
          <button class="nav-item">
          ${item.title}
          </button>
        </li>
      `,
          ``
        )}
      </ul>
    `;
  },

  getSearchInfoTemplate({ list, listClassName }) {
    return `
    <ul>
      ${list.reduce(
        (html, item, idx) => `
          ${html}
          <li class="${listClassName}" data-idx=${idx}>${item}</li>
        `,
        ``
      )}
      <li class="search-info-title"><span>${this.title}</span></li>
    </ul>
  `;
  }
};
