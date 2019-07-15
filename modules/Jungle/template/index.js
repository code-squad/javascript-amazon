const templates = {
  carousel: cards => {
    return `
      <div class="card-wrapper">
        <div class="card-slider">
          ${cards.reduce((acc, card) => {
            return (acc += card.outerHTML);
          }, '')}
        </div>
      </div>
      <button class="card-control prev"><</button>
      <button class="card-control next">></button>
    `;
  },

  autoFrame: _ => {
    return `
    <div class="auto-container">
      <div class="autocomplete-wrapper">
        <div class="auto-frame">
          <ul>
            <li><span>안녕하세요</span></li>
            <li><span>안녕하세요</span> 하기가싫군요</li>
            <li class="selected"><span>안녕하세요</span> 마크업은 매우 귀찮네요</li>
          </ul>
        </div>
      </div>
    </div>
    `;
  },

  autoInput: _ => {
    return `
      <input type="text" name="auto-search" id="auto-search" class="auto-search" /><button>
          <img src="./resources/images/search-icon.png" />
      </button>`;
  },

  autoRecent: _ => {
    return `
      <div class="auto-frame">
        <ul>
          <li><span>이건 최근검색어에요</span></li>
          <li><span>안녕하세요</span> 하기가싫군요</li>
          <li class="selected"><span>안녕하세요</span> 마크업은 매우 귀찮네요</li>
        </ul>
      </div>
    `;
  }
};

export const makeHTMLString = ({ data, type }) => {
  return templates[type](data);
};
