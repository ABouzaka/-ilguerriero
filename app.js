//======================================================================
//load modules=========================================================
//=====================================================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var flash = require("connect-flash");

//======================================================================
//CREATE express INSTANCE===============================================
//======================================================================
var app = express();

//======================================================================
//VIEW ENGINE SETUP=====================================================
//======================================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//=======================================================================
//CREATE REQUIRED MODULES INSTANCES AND PASS THEM TO EXPRESS=============
//=======================================================================
/**
 * app.use() middleware : handle all HTTP request send to the server.
 * so a module instance will be created whenever  a HTTP req(GET,POST,PUT,DELETE) send to the server
 */
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(session({
  secret :'48ds457ffg5fgJsdgshdJSlsdksd5s',
  resave: true,
  saveUninitialized: true

}));
app.use(passport.initialize());
app.use(passport.session());

//=======================================================================
//DATABASE===============================================================
//=======================================================================
var configDB = require('./config/database');
mongoose.connect(configDB.url); // connect to our database

//=======================================================================
//Authentication with Passport Strategies================================
//=======================================================================
require("./config/passport")(passport);

//======================================================================
//ROUTES================================================================
//======================================================================
require('./app/routes')(app, passport); // load our routes and pass in our "app" and "fully configured passport"
require('./app/WebService')(app);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
