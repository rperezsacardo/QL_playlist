'use strict';

require('dotenv').config();

const { Pool } = require('pg');

const databaseConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};
const pool = new Pool(databaseConfig);

module.exports = pool;

//const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
//Debugging
// pool.query('SELECT * FROM song', (error, response) => {
//   if (error) return console.log('error', error);
//   console.log('response', response.rows);
// });
