const express = require('express');

const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/entry/index.html'));
});

router.get('/suggestions', (req, res, next) => {
  const { prefix } = req.query;
  const dataPath = path.join(__dirname, `../data/suggestions/${prefix}.json`);

  res.json(JSON.parse(fs.readFileSync(dataPath)));
});

module.exports = router;
