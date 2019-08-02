const express = require('express');

const app = express();

app.listen(3000, _ => console.log('start! express server on port 3000'));

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
