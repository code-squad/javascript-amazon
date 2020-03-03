const SearchModel = function SearchModel(src) {
  this.src = src;
};

SearchModel.prototype.fetchList = function fetchList(str, callback = null) {
  fetch(this.src)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (typeof callback !== "function") throw new Error(`${callback} is not function.`);
      const regex = new RegExp(`^(${str})(?:W*)(.*)?$`);
      const matchedWords = this.matchWord(regex, data.list);
      callback(matchedWords);
    });
};

SearchModel.prototype.matchWord = function matchWord(regex, wordArray) {
  const words = [];
  const MAX_SIZE = 10;
  wordArray.forEach(eachWord => {
    const matchedWord = eachWord.match(regex);
    if (matchedWord) {
      words.push({
        boldSpell: matchedWord[2] || "",
        restSpell: matchedWord[1] || "",
      });
    }
  });
  if (words.length > MAX_SIZE) words.length = MAX_SIZE;
  return words;
};

export default SearchModel;
