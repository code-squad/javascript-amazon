const express = require('express');
const cors = require('cors');
const app = express();
const dataJSON = require('./data/data.json')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(dataJSON);
});

app.listen(8081);
