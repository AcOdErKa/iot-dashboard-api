var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()

var sensorDataRouter = require('./routes/sensordata');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to DB
require('./dbconfig')()

// Attach Routes
app.use('/', sensorDataRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
