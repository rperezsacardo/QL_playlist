'use strict';

const { getAccount } = require('../sql/users_table');

module.exports = (req, res, next) => {
  const email = req.cookies.user.email || null;
  if (email) {
    getAccount(email)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next();
  }
};
