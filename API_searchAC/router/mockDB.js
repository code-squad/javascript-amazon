const fetch = require('node-fetch');

function queryMockDB(queryStr) {
  return fetch('/Users/boyoung/Development/javascript-amazon/API_searchAC/public/response.json')
    .then(response => response.json())
    .then(json => json[queryStr] || {})
    .catch((err) => {
      console.log(`Fetch failed! Error: ${err}`);
      return {};
    });
}

queryMockDB('i');

module.exports = queryMockDB;
