const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../public/html/index.html"),
    (err, data) => {
      res.write(data);
      res.end();
    }
  );
});

router.get("/api/", (req, res) => {
  fs.readFile(path.join(__dirname, "../api/index.json"), (err, data) => {
    res.write(data);
    res.end();
  });
});

module.exports = router;
