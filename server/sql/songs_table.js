'use strict';

const pool = require('../databasePool');
const { v4: uuidv4 } = require('uuid');

const addSong = (title, onlyPremium) => {
  const id = uuidv4();
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO songs(title, "onlyPremium", id) VALUES($1,$2, $3) RETURNING *',
      [title, onlyPremium, id],
      (error, response) => {
        if (error) return reject(error);
        resolve(response.rows[0]); // returns new song
      }
    );
  });
};

const listSongs = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * from songs`, [], (error, response) => {
      if (error) return reject(error);
      if (response) return resolve(response.rows); // return all user from db
    });
  });
};

const updateSong = (title, onlyPremium, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE songs SET title =($1), "onlyPremium"=($2) WHERE id={$3} RETURNING *',
      [title, onlyPremium, id],
      (error, response) => {
        if (error) return reject(error);
        resolve(response.rows[0]); // returns new user
      }
    );
  });
};

const removeSongFromAllPlaylists = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE FROM accounts SET playlist= array_remove(playlist, ($1) RETURNING *;`,
      [id],
      (error, response) => {
        if (error) return reject(error);
        if (response) return resolve(response); //
      }
    );
  });
};

const deleteSong = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM songs WHERE id=$1 RETURNING *;`, [id], (error, response) => {
      if (error) return reject(error);
      if (response) return resolve(response.rows); //
    });
  });
};

const findOneSong = (title) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id,title, "onlyPremium", FROM songs WHERE title = $1`,
      [title],
      (error, response) => {
        if (error) return reject(error);
        resolve(response.rows[0]);
      }
    );
  });
};

module.exports = {
  addSong,
  updateSong,
  deleteSong,
  findOneSong,
  listSongs,
  removeSongFromAllPlaylists
};
