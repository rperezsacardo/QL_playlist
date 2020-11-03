'use strict';
require('dotenv').config();
const { Router } = require('express');

const {
  listSongs,
  deleteSong,
  addSong,
  findOneSong,
  updateSong,
  removeSongFromAllPlaylists
} = require('../../sql/songs_table');
const routeGuard = require('../../middleware/route-guard');
const isAdmin = require('../../middleware/admin-check');

const router = new Router();

router.get('/', (req, res, next) => {
  // get all songs

  listSongs()
    .then((result) => res.json(result))

    .catch((error) => next(error));
});
// Serch for one Song  by title
router.get('/search', (req, res, next) => {
  const { title } = req.body;

  findOneSong(title)
    .then((result) => res.json(result))

    .catch((error) => next(error));
});
// Add song
router.post('/add', (req, res, next) => {
  const { title, onlyPremium } = req.body;
  addSong(title, onlyPremium)
    .then((result) => res.json({ result }))
    .catch((error) => next(error));
});

//update song
router.post('/update', (req, res, next) => {
  const { title, onlyPremium, id } = req.body;
  updateSong(title, onlyPremium, id)
    .then((result) => res.json({ result }))
    .catch((error) => next(error));
});
//delete song
router.delete('/delete', (req, res, next) => {
  const { title, onlyPremium, id } = req.body;

  deleteSong(id)
    .then((result) => res.json({ result }))
    .catch((error) => next(error));
  // removeSongFromAllPlaylists(id)
  //   .then((result) => console.log(result))
  //   .catch((error) => next(error));
});
module.exports = router;
