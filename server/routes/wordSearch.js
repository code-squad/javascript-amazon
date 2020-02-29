var express = require('express');
var router = express.Router();
const wordData = require('./json/wordData.json');

router.post('/', function (req, res) {
    const input = req.body;
    const maximum = 10;
    const responseData = wordData.words.reduce((acc, word) => {
        if (acc.length >= maximum || !word.startsWith(input)) return acc;
        acc.push(word);
        return acc;
    }, []);
    res.json(responseData);
});

module.exports = router;