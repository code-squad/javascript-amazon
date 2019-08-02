const express = require('express');

const router = express.Router();
const fs = require('fs');

const rawAutoSuggestionData = JSON.parse(
  fs.readFileSync('./public/autoSuggestion.json')
);

const STATUS = {
  OK: {
    CODE: 200
  },
  NO_ITEM: {
    CODE: 404,
    MSG: 'Not fount item'
  }
};

const getFilteredData = (srcData, query, maxresult = 10) => {
  return srcData
    .filter(d => {
      return d.toLowerCase().startsWith(query);
    })
    .slice(0, Number(maxresult))
    .map(d => {
      return { value: d };
    });
};

const applySchema = (data, query) => {
  if (data.length === 0) {
    const { MSG, CODE } = STATUS.NO_ITEM;
    return { body: MSG, statusCode: CODE };
  }
  const { CODE } = STATUS.OK;
  return {
    statusCode: CODE,
    body: {
      prefix: query,
      suggestions: data
    }
  };
};

router.get('/', function(req, res) {
  const { query, maxresult } = req.query;

  const filteredData = getFilteredData(rawAutoSuggestionData, query, maxresult);
  const result = applySchema(filteredData, query);

  res.header('Content-Type', 'application/json');
  res.json(result);
});

module.exports = router;
