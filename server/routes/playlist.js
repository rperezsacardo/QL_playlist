'use strict';
require('dotenv').config();

const { Router } = require('express');
const { getAccount, addSongToPlaylist } = require('./../sql/users_table');
const { listSongs } = require('./../sql/songs_table');

const router = new Router();

router.get('/', (req, res, next) => {
  const { email } = req.cookies.user;
  getAccount(email)
    .then((document) => {
      res.json(document.playlist);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/', (req, res, next) => {
  const { email, premium, playlist } = req.body;

  if (premium && playlist.length > 5)
    return res.json({ type: 'fail', data: { title: 'Limit of 5 songs' } });
  if (!premium && playlist.length > 15)
    return res.json({ type: 'fail', data: { title: 'Limit of 3 songs' } });

  // filter to prevent standard user to add premium songs
  let filterPlaylist; //debug!!!
  if (!premium) {
    filterPlaylist = playlist.map((song) => !song.onlyPremium);
  } else {
    filterPlaylist = playlist;
  }

  addSongToPlaylist(playlist, email)
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
