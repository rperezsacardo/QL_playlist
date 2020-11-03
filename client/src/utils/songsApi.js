import axios from 'axios';

const baseRouterSongs = axios.create({
  baseURL: '/api/song-manger'
});

const listAllSongs = () => {
  return baseRouterSongs
    .get('/')
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const addSongApi = (title, onlyPremium) => {
  // Admin add song
  const body = { title, onlyPremium };
  return baseRouterSongs
    .post('/add', body)
    .then((response) => {
      return Promise.resolve(response.data.result);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { listAllSongs, addSongApi };
