const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('Welcome to Help Notes API');
});

module.exports = router;