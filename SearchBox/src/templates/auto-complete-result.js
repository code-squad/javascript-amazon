const autoCompleteResult = ({ item, keyword }) => {
  const title = splitByKeyword(item, keyword);
  return `
    <li>
      ${title.before ? `<strong>${title.before}</strong>` : ``}
      ${title.matched ? `<span>${title.matched}</span>` : ``}
      ${title.after ? `<strong>${title.after}</strong>` : ``}
    </li>
  `;
};

const splitByKeyword = (item, keyword) => {
  const targetIndex = item.indexOf(keyword);
  const targetLen = keyword.length;
  const title = {
    before: item.slice(0, targetIndex),
    matched: keyword,
    after: item.slice(targetIndex + targetLen)
  };
  return title;
};

export default autoCompleteResult;
