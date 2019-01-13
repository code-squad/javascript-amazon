const express = require('express');
const queryMockDB = require('./mockDB');

const router = express.Router();

const pathRegEx = /\/ac\/.+/;

router.options(pathRegEx, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.send();
});

router.get(pathRegEx, (req, res) => {
  const queryStr = req.path.replace(/\/ac\//, '');
  const decodedQueryStr = decodeURI(queryStr);
  const suggestionJSON = queryMockDB(decodedQueryStr);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(suggestionJSON);
});

module.exports = router;
