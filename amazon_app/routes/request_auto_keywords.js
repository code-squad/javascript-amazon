var express = require('express');
var router = express.Router();
var list = require('../public/javascripts/keywords_list')

router.get('/:keyword', function (req, res) {
    let keywordMatchedObj = "";
    list.keywordsList.forEach(keywordInfo => {
        if(keywordInfo["prefix"] === req.params.keyword) {
            keywordMatchedObj = keywordInfo; 
        }
    } )
    res.send(keywordMatchedObj);
});

module.exports = router;