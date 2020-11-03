import axios from 'axios';

const baseRouterSongs = axios.create({
  baseURL: '/api/playlist'
});

const updatePlaylistApi = (email, playlist, premium) => {
  const body = { email, playlist, premium };

  return baseRouterSongs
    .post('/', body)
    .then((result) => {
      const playlist = result.data.result.playlist;
      return Promise.resolve(playlist);
    })
    .catch((error) => Promise.reject(error));
};
const loadPlaylistInformationApi = () => {
  return baseRouterSongs
    .get('/')
    .then((result) => {
      const playlist = result.data;
      //const JSONResult = playlist.map((item) => JSON.parse(item));
      return Promise.resolve(playlist);
    })
    .catch((error) => Promise.reject(error));
};

export { updatePlaylistApi, loadPlaylistInformationApi };
