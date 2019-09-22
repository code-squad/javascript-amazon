const config = {
  searchFormSelector: '.search-form',
  inputSelector: '.search-bar',
  buttonSelector: '.search-button',

  url: 'https://allen-amazon.herokuapp.com/suggestions',

  suggestionDelayInMs: 300,
  selectedElementColor: '#f1f2f6',
  maxRecentKeywords: 5,
  initialRecentKeywords: ['javascript', 'amazon']
};

export default config;
