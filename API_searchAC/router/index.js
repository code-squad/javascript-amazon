const express = require('express');
const queryMockDB = require('./mockDB');

const router = express.router();

router.use('/', queryMockDB);

module.exports = router;
