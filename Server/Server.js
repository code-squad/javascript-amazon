const port = 8080;
const express = require('express');
const app = express();
const fs = require('fs');
const data = fs.readFileSync('localData.json', 'utf8');
const contents = JSON.parse(data);

app.get('/', (req, res) => res.send(contents));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));