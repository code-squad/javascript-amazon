const SearchModel = function SearchModel(src) {
  this.src = src;
};

SearchModel.prototype.getList = function getList(str, fn) {
  fetch(this.src)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const regex = new RegExp(`^(${str})(?:W*)(.*)?$`);
      const matchedWord = this.matchWord(regex, data.list);
      fn(matchedWord);
    });
};

SearchModel.prototype.matchWord = function matchWord(regex, wordArray) {
  const word = [];
  const MAX_SIZE = 10;
  wordArray.forEach(eachWord => {
    if (eachWord.match(regex)) {
      word.push({
        boldSpell: eachWord.match(regex)[2] || "",
        restSpell: eachWord.match(regex)[1] || "",
      });
    }
  });
  if (word.length >= MAX_SIZE) word.length = MAX_SIZE;
  return word;
};

export default SearchModel;
