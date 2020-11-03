'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtGenerator = (userId) => {
  const payload = {
    userId
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};
module.exports = jwtGenerator;
