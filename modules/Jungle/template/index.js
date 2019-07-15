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

  autoComplete: _ => {
    return `
    <div class="auto-container">
      <div class="autocomplete-wrapper">
        <input type="text" name="auto-search" id="auto-search" class="auto-search" /><button>
          <img src="./resources/images/search-icon.png" />
        </button>
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
  }
};

export const makeHTMLString = ({ data, type }) => {
  return templates[type](data);
};
