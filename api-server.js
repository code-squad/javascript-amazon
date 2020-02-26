const express = require('express');
const cors = require('cors');
const app = express();
const dataJSON = require('./data/data.json');
const keywordJSON = require('./data/keyword.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(dataJSON);
});
app.get('/keyword', (req, res) => {
    res.send(keywordJSON);
});

app.listen(8081);
