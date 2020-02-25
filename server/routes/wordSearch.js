var express = require('express');
var router = express.Router();
const wordData = require('../public/json/wordData.json');

router.post('/', function (req, res, next) {
    const input = req.body;
    if (input === "") return;
    console.log(input);

    const result = wordData.words.reduce((acc, cur) => {
        if (cur.startsWith(input)) {
            acc.push(cur);
        }
        return acc;
    }, []);
    res.json(result);
});

module.exports = router;