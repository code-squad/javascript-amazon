const express = require('express');
const router = express.Router();
const localData = require("../public/json/localData.json");

router.get('/', function (req, res, next) {
  res.contentType('application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(localData);
});

module.exports = router;