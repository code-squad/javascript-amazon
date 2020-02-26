const express = require('express');
const router = express.Router();
const titleData = require("../assets/title_data.json");

router.get('/:target', function (req, res, next) {
    const { target } = req.params;
    const { titles } = titleData;

    const hitList = [];

    titles.reduce((acc, title) => {
        if (title.toLowerCase().startsWith(target.toLowerCase())) {
            acc.push(title);
        }
        return acc;
    }, hitList);

    res.contentType('application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    hitList.length ? res.json({ hitList }) : res.json({});
});

module.exports = router;
