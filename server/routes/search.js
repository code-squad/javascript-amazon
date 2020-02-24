const express = require('express');
const router = express.Router();
const bookList = require("../public/json/book_list.json");

router.get('/:target', function (req, res, next) {
    const { target } = req.params;
    const { books } = bookList;

    const hitList = [];

    books.reduce((acc, cur) => {
        if (cur.toLowerCase().startsWith(target.toLowerCase())) {
            acc.push(cur);
        }
        return acc;
    }, hitList);

    res.contentType('application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    hitList.length ? res.json({ hitList }) : res.json({});
});

module.exports = router;
