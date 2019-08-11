const autoCompleteResult = ({ item, keyword }) => {
  if (!keyword) return "";
  const title = splitByKeyword(item, keyword);
  return `
    <li> 
      <span>${title.before ? `<strong>${title.before}</strong>` : ``}${
    title.matched ? `${title.matched}` : ``
  }${title.after ? `<strong>${title.after}</strong>` : ``}</span>
    </li>
  `;
};

const splitByKeyword = (item, keyword) => {
  const targetIndex = item.indexOf(keyword);
  const targetLength = keyword.length;
  const title = {
    before: item.slice(0, targetIndex),
    matched: keyword,
    after: item.slice(targetIndex + targetLength)
  };
  return title;
};

export default autoCompleteResult;
