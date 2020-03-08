const express = require('express');
const cors = require('cors');
const searchData = require("./public/searchData.json");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    res.json(searchData);
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})