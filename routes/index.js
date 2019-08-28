const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("/index.html");
});

router.get("/autocomplete", (req, res, next) => {
  const searchKeyword = req.query.suggestion;
  const jsonPath = path.join(
    __dirname,
    "..",
    "public",
    "data",
    `${searchKeyword}.json`
  );
  fs.readFile(jsonPath, (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    return res.json(jsonData);
  });
});
module.exports = router;
