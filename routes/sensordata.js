var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  res.send("Welcome to iot-dashboard-service")
});



module.exports = router;
