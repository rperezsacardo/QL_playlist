'use strict';

// Route Guard Middleware
// Check if a user is authenticated
// If not, it sends the request to the app error handler with a message

require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.user.accessToken;
  if (token === null) {
    const error = new Error('AUTHENTICATION_REQUIRED');
    error.status = 401;
    next(error);
  }
  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      const error = new Error('AUTHENTICATION_REQUIRED');
      error.status = 401;
      next(error);
    }
    req.user = user;
    next();
  });
};
// module.exports = (req, res, next) => {
//   const token = req.headers['authorization'];
//       if (token === null) {
//     const error = new Error('AUTHENTICATION_REQUIRED');
//     error.status = 401;
//     next(error);
//   }
//   jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
//     console.log(err);
//     if (err) {
//       const error = new Error('AUTHENTICATION_REQUIRED');
//       error.status = 401;
//       next(error);
//     }
//     req.user = user;
//     next();
//   });
// };
