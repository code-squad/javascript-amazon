const express = require('express');
const router = express.Router();

router.get('/index.html', function (req, res, next) {
  res.end()
})

module.exports = router;