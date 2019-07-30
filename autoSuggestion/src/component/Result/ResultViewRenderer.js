export default {
  noResultSuggestionTemplate({ resultItem, noResultItem }) {
    return `<li class="${resultItem} ${noResultItem}">일치하는 검색결과가 없습니다</li>`;
  },

  noResultRecentQueryTemplate({ resultItem, noResultItem }) {
    return `<li class="${resultItem} ${noResultItem}">최근 검색결과가 없습니다</li>`;
  },

  recentQueryTemplate(recentQueryList, { resultItem }) {
    return recentQueryList.reduce((prev, curr) => {
      return `${prev}<a href="#" class="${resultItem}" data-value="${curr}"><li >${curr}</li></a>`;
    }, '');
  },

  suggestionTemplate(query, suggesions, { resultItemHighlighted, resultItem }) {
    const pattern = new RegExp(`${query}`, 'i');
    return suggesions.reduce((prev, curr) => {
      const hilghtedSuggestion = curr.replace(
        pattern,
        `<span class=${resultItemHighlighted}>$&</span>`
      );
      return `${prev}<a href="#" class="${resultItem}" data-value="${curr}"><li>${hilghtedSuggestion}</li></a>`;
    }, '');
  },

  getAutoSuggesionList(dataSrc) {
    const resList = dataSrc
      .map(item => item.value)
      .sort(this.sort)
      .slice(0, this.maxResult);
    return resList;
  },

  sort(a, b) {
    if (a.match < b.match) {
      return -1;
    }
    if (a.match > b.match) {
      return 1;
    }
    return 0;
  },
  maxResult: 10
};
