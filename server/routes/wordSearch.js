var express = require('express');
var router = express.Router();
const wordData = require('../public/json/wordData.json');

router.post('/', function (req, res, next) {
    const input = req.body;
    console.log(input);
    const result = [];
    const maximum = 10;
    for (let i = 0; i < wordData.words.length; i++) {
        if (result.length >= maximum) break;
        if (wordData.words[i].startsWith(input)) {
            result.push(wordData.words[i]);
        }
    }
    res.json(result);
});

module.exports = router;