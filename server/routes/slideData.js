var express = require('express');
var router = express.Router();
const slideData = require('./json/slideData.json');

router.post('/', function (req, res) {
    res.send(slideData);
});

module.exports = router;