const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const callSug = require('../public/callSuggestion.js');
  let sugData = req.baseUrl.slice(1, req.baseUrl.length);
  res.set({
    'Access-Control-Allow-Origin':'*'
  })
  res.send(callSug(sugData));
});

module.exports = router;
