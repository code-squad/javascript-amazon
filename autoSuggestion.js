const express = require('express');

const router = express.Router();
const fs = require('fs');

const rawAutoSuggestionData = JSON.parse(
  fs.readFileSync('./public/autoSuggestion.json')
);

// define the home page route
router.get('/', function(req, res) {
  const { prefix } = req.query;
  const { maxresult } = req.query;
  console.log(prefix, maxresult);

  const filteredData = rawAutoSuggestionData
    .filter(d => {
      return d.toLowerCase().startsWith(prefix);
    })
    .slice(0, Number(maxresult))
    .map(d => {
      return { value: d };
    });
  let result;
  if (filteredData.length === 0) {
    result = { body: 'not found item', statusCode: 404 };
  } else {
    result = { body: { suggestions: filteredData }, statusCode: 200 };
  }
  res.header('Content-Type', 'application/json');
  res.json(result);
});

module.exports = router;
