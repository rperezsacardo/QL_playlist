'use strict';
require('dotenv').config();

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const { storeAccount, getAccount } = require('../../sql/users_table');
const routeGuard = require('./../../middleware/route-guard');
const router = new Router();

//Sign up

router.post('/sign-up', (req, res, next) => {
  const { username, email, password, admin, premium, playlist } = req.body;
  getAccount(email) // Check if the user exists
    .then((data) => {
      if (!data) {
        // Then Hash password
        return bcryptjs
          .hash(password, 10)
          .then((hash) => {
            return storeAccount(username, email, hash, admin, premium, playlist);
          })
          .then((response) => {
            // Returns with jwt token
            const payload = {
              email: response.email
            };
            const accessToken = jwt.sign(payload, process.env.JWT_TOKEN);
            const userData = {
              accessToken,
              userId: response.id,
              email: response.email,
              username: response.username,
              playlist: response.playlist
            };

            res.cookie('user', userData, { httpOnly: true });
            res.json({ userData });
          });
      } else {
        // Otherwise returns error
        const error = new Error(`The user with email: ${email} has already been registered`);
        error.statusCode = 409;
        throw error;
      }
    })
    .catch((error) => {
      next(error);
    });
});

//Sign in

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;

  getAccount(email)
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error('Wrong  email or password.'));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then((result) => {
      if (result) {
        const accessToken = jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: '1hr' });
        const userData = {
          accessToken,
          userId: user.id,
          email: user.email,
          username: user.username,
          playlist: user.playlist,
          premium: user.premium,
          admin: user.adminPrivileges
        };

        res.cookie('user', userData, { httpOnly: true });
        
        res.json(userData);
      } else {
        return Promise.reject(new Error('Wrong  email or password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});
// Send user basic information
router.get('/me', routeGuard, (req, res) => {
  console.log('me');
  res.json({
    user: req.cookies.user || null
  });
});

router.post('/sign-out', (req, res, next) => {
  res.clearCookie('user');
  req.session.destroy();
  res.json({});
});

module.exports = router;
