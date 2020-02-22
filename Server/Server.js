const port = 8080;
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const data = fs.readFileSync('localData.json', 'utf8');
const contents = JSON.parse(data);

app.use(cors());
app.get('/', (req, res) => res.send(contents));
app.listen(port, () => console.log(`App listening on port ${port}!`));