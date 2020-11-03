'use strict';

const pool = require('../databasePool');

const storeAccount = (username, email, passwordHash, admin, premium, playlist = []) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO account(username, email, "passwordHash", "adminPrivileges", premium, playlist) VALUES($1,$2, $3, $4,$5,$6) RETURNING *',
      [username, email, passwordHash, admin, premium, playlist],
      (error, response) => {
        if (error) return reject(error);
        resolve(response.rows[0]); // returns new user
      }
    );
  });
};

const getAccount = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM account WHERE email = $1`, [email], (error, response) => {
      if (error) return reject(error);
      resolve(response.rows[0]);
    });
  });
};

const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * from account`, [], (error, response) => {
      if (error) return reject(error);
      if (response) return resolve(response.rows); // return all user from db
    });
  });
};

const updateUser = (updates) => {
  const { email, username, premium, passwordHash, admin, playlist } = updates;

  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE account SET username =($1), email= ($2), "passwordHash"= ($3), "adminPrivileges"=($4), premium=($5), playlist=($6) WHERE email=($2) RETURNING *',
      [username, email, passwordHash, admin, premium, playlist],
      (error, response) => {
        if (error) return reject(error);
        resolve(response.rows[0]); // returns user data updated
      }
    );
  });
};

const addSongToPlaylist = (playlist, email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE account SET playlist=($1) WHERE email=($2) RETURNING playlist',
      [playlist, email],
      (error, response) => {
        if (error) return reject(error);
        resolve(response.rows[0]); // returns new user data
      }
    );
  });
};

const deleteUser = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM account WHERE email=$1`, [email], (error, response) => {
      if (error) return reject(error);
      if (response) return resolve(response); //
    });
  });
};

module.exports = {
  storeAccount,
  getAccount,
  findAllUsers,
  deleteUser,
  updateUser,
  addSongToPlaylist
};
