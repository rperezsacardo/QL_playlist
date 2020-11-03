'use strict';

const { join } = require('path');
const express = require('express');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/auth/authentication');
const adminRouter = require('./routes/auth/admin');
const songManger = require('./routes/auth/songs_manager');
const playlist = require('./routes/playlist.js');

const app = express();

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 15 * 1000, // 30 days
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? false : true
    }
  })
);

app.use('/api/playlist', playlist);
app.use('/api/', indexRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/admin', adminRouter);
app.use('/api/song-manger', songManger);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
