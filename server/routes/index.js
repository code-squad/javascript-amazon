const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/index.html', function (req, res, next) {
  res.end()
})

router.get('/suggestions', (req, res, next) => {
  const { prefix } = req.query;
  const dataPath = path.join(__dirname, `../data/suggestions/${prefix}.json`);

  res.json(JSON.parse(fs.readFileSync(dataPath)));
})

module.exports = router;