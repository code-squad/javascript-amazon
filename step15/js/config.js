export default {
  model: {
    srcUrl: './data.json',
    sort(a, b) {
      if (a.match < b.match) {
        return -1;
      }
      if (a.match > b.match) {
        return 1;
      }
      return 0;
    },
    maxResult: 10,
    delay: 300,
  },
  inputView: {
    inputEl: '.autoComplete_input',
  },
  resultView: {
    resultEl: '.autoComplete_result',
    resultItem: 'autoComplete_result_item',
    resultItemHighlighted: 'autoComplete_result_item-highlighted',
  },
};
