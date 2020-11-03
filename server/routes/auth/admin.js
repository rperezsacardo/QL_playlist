'use strict';
require('dotenv').config();

const { Router } = require('express');

const bcryptjs = require('bcryptjs');

const {
  storeAccount,
  getAccount,
  findAllUsers,
  deleteUser,
  updateUser
} = require('../../sql/users_table');
const routeGuard = require('./../../middleware/route-guard');
const isAdmin = require('./../../middleware/admin-check');
const router = new Router();

//Create User

router.post('/new', (req, res, next) => {
  const { username, email, password, admin, premium } = req.body;

  getAccount(email) // Check if the user exists
    .then((data) => {
      if (!data) {
        // Then Hash password
        return bcryptjs
          .hash(password, 10)
          .then((hash) => {
            return storeAccount(username, email, hash, admin, premium);
          })
          .then((response) => {
            // Returns new user information
            const newUser = {
              email: response.email,
              username: response.username,
              premium: response.premium,
              password: password, // returns typed password
              playlist: [] // initial playlist array
            };

            res.json({ newUser });
          });
      } else {
        // Otherwise returns error
        const error = new Error(`The user with email: ${email} has already been registered`);
        error.statusCode = 409;
        next(error);
      }
    })
    .catch((error) => {
      next(error);
    });
});

// List all users

router.get('/list', (req, res, next) => {
  findAllUsers()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

//update users

router.post('/update', (req, res, next) => {
  const { email, premium, username, password, admin, playlist, passwordHash } = req.body;

  const update = {
    email,
    premium,
    username,
    admin,
    playlist
  };
  if (password) {
    return bcryptjs
      .hash(password, 10)
      .then((hash) => {
        return updateUser({ ...update, passwordHash: hash });
      })
      .then((result) => {
        res.json({ ...update, password }); // send updates + typed password
      })
      .catch((error) => next(error));
  } else {
    updateUser({ ...update, passwordHash: passwordHash })
      .then((result) => {
        res.json({ ...update }); // send updates + typed password
      })
      .catch((error) => next(error));
  }
});

// delete user

router.post('/delete', (req, res, next) => {
  const { email } = req.body;
  deleteUser(email)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

module.exports = router;
