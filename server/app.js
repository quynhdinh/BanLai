const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// access origin
app.use(cors())

app.use('/', require('./routes/index'));
app.use('/apis', require('./routes/index'));
app.use("/admin", require('./routes/admin'));
app.use('/users', require('./routes/user'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/carelist', require('./routes/care-list'));
app.use('/api/messages', require('./routes/message'));
app.use('/api/viewedposts', require('./routes/viewed-post'));

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const allowedOrigins = ['https://h5.zdn.vn/', 'zbrowser://h5.zdn.vn/'];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return next();
});


module.exports = app;
