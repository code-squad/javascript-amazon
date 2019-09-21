const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Start server on port ${port}!!`);
});
