const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'src')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});
app.listen(8080, () => {
  console.log('Express App on port 8080!');
});
