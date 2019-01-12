const template = {
  suggestion({ value, refTag }, searchWord) {
    const replaceWhiteSpace = (string, replaceChar) => string.replace(/\s/g, replaceChar);
    const ref = replaceWhiteSpace(refTag, '+');
    const fieldKeyword = replaceWhiteSpace(value, '+');
    const prefix = replaceWhiteSpace(searchWord, '+');

    const leftoverStr = value.slice(searchWord.length);
    const displayVal = `<span class="search__suggestion--matchStr">${searchWord}</span>`
      + `<span class="search__suggestion--otherStr">${leftoverStr}</span>`;

    return `
    <li class="search__suggestionLi">
      <a href="/search?ref=${ref}&field-keywords=${fieldKeyword}&prefix=${prefix}">${displayVal}</a>
    </li>`;
  },
};

export default template;
