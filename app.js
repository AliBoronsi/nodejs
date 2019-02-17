var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Utility = require('./Utils/Utility');

var indexRouter = require('./routes/index');
var gamesRouter = require('./routes/games');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*',Utility.RedirectToHTTPS);

app.use('/', indexRouter);
app.use('/games', gamesRouter);

module.exports = app;
