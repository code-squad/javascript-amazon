const fs = require('fs');
const path = require('path');

const resURI = path.join(__dirname, '../public/response.json');

function queryMockDB(queryStr) {
  const content = fs.readFileSync(resURI);
  const json = JSON.parse(content);
  return json[queryStr] ? json[queryStr] : { result: 'no data' };
}

module.exports = queryMockDB;
