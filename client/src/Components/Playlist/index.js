import React, { useState, useEffect } from 'react';

import { loadUserInfo } from '../../utils/authenticationApi';
import { addSongApi, listAllSongs } from './../../utils/songsApi';

import { updatePlaylistApi, loadPlaylistInformationApi } from './../../utils/playlistApi';

import { Card, Container, UContainer, Button } from './../../styles/styles';

// Debug Filter system to prevent duplicated songs
const Playlist = () => {
  const [userInfo, setUserInfo] = useState({});
  const [songs, setSongs] = useState([]);
  const [userPlaylist, setUserPlaylist] = useState([]);
  const [songKeys, setSongKeys] = useState([userPlaylist.filter((el) => el.id)]);

  const addSongToPlaylist = (song) => {
    // add Song to Playlist
    const filter = songKeys ? songKeys.filter((el) => el === song.id) : false;

    if (filter.length) return songKeys;
    const newPlaylist = [...userPlaylist, song];

    if (song.onlyPremium && !userInfo.premium) return window.alert('Exclusive for Premium users');
    updatePlaylistApi(userInfo.email, newPlaylist, userInfo.premium) // send new data to server
      .then((result) => {
        setUserPlaylist(result);
        const ids = result.filter((el) => el.id);
        setSongKeys(ids); // filter Ids to prevent duplicated songs
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const removeSongToPlaylist = (song) => {
    const newPlaylist = userPlaylist.filter((item) => item.id !== song.id);
    updatePlaylistApi(userInfo.email, newPlaylist, userInfo.premium)
      .then((result) => {
        setUserPlaylist(result);
        const ids = result.filter((el) => el.id);
        setSongKeys(ids);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const playListLimit = () => {
    const { premium } = userInfo;
    if ((premium && userPlaylist.length >= 5) || (!premium && userPlaylist.length >= 3))
      return <h4>Your playlist it's full, you can have up to {(premium && 5) || 3}</h4>;
    if ((premium && userPlaylist.length <= 5) || (!premium && userPlaylist.length <= 3))
      return <h4>You can Add {(premium && 5 - userPlaylist.length) || 3 - userPlaylist.length}</h4>;
  };
  const filterArray = [].concat(
    // debug, should prevent songs  with same id
    userPlaylist.filter((obj1) => songs.every((obj2) => obj1.id !== obj2.id)),
    songs.filter((obj2) => userPlaylist.every((obj1) => obj2.id !== obj1.item))
  );

  const renderFiltersSongs = filterArray.map((song) => {
    // render <li>
    return (
      <Card key={song.id}>
        <span>
          <img srcSet={'https://source.unsplash.com/100x100/?guitar'} alt='Guitar' />
          <span>
            <p>{song.onlyPremium && 'Gold Only'}</p>
            <p>{song.title}</p>
          </span>
          <Button onClick={(e) => addSongToPlaylist(song)}>Add me</Button>
        </span>
      </Card>
    );
  });

  const renderUserPlaylist = userPlaylist.map((song) => {
    return (
      <Card key={song.id}>
        <span>
          <img srcSet={'https://source.unsplash.com/100x100/?guitar'} alt='Guitar' />
          <p>{song.title}</p>
          <Button onClick={(e) => removeSongToPlaylist(song)}>Remove </Button>
        </span>
      </Card>
    );
  });
  const loadUserInfoFromApi = () => {
    loadUserInfo()
      .then((result) => {
        setUserInfo({ ...result.user });
      })
      .catch((error) => console.log(error));
  };

  const listAllSongsFromApi = () => {
    listAllSongs()
      .then((resultSongs) => {
        setSongs(resultSongs.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // load all basic information
    loadUserInfoFromApi();
    listAllSongsFromApi();
  }, []);

  return (
    <Container>
      <div>
        <h3>My Playlist</h3>
        <br />
        {userInfo && playListLimit()}
        <br />
      </div>
      <hr />
      <UContainer>
        {(userPlaylist.length && renderUserPlaylist) || <h4> Start adding Songs</h4>}
      </UContainer>
      <h4>All Songs</h4>

      <UContainer>{userInfo && renderFiltersSongs}</UContainer>
    </Container>
  );
};

export default Playlist;
