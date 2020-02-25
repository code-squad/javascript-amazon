var express = require("express");
var router = express.Router();
const data = require("../mockData.json");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("content-type", "application/jsonnp");
  res.json(data);
});

module.exports = router;
