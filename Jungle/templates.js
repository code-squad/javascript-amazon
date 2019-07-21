export default {
  getCategoryTagsTemplate({ categories }) {
    return `
    ${categories.reduce(
      (html, category, idx) =>
        `
        ${html}
        <option value="" ${idx === 0 ? `selected` : ``}>${category}</option>
        `,
      ``
    )}
  `;
  },

  getSearchTemplate({ categories }) {
    return `
    <form action="#" class="search-form">
    <div class="search-wrapper">
      <div class="search-category">
        <div class="icon-down-arrow"></div>
        <select name="" id="">
          ${this.getCategoryTagsTemplate({ categories })}
        </select>
      </div>
      <div class="search-input">
        <input type="search" name="" id="">
        <div class="search-info-list">
        </div>
      </div>
      <div class="search-submit">
        <div class="icon-magnifying-glass">&#9906;</div>
        <input type="submit" value="">
      </div>
    </div>
  </form>
    `;
  },

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

  getSearchInfoTemplate({ list, listClassName, title }) {
    return `
    <ul>
      ${list.reduce(
        (html, item, idx) => `
          ${html}
          <li class="${listClassName}" data-idx=${idx}>${item}</li>
        `,
        ``
      )}
      <li class="search-info-title"><span>${title}</span></li>
    </ul>
  `;
  }
};
