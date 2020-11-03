import axios from 'axios';

const baseRouterAdmin = axios.create({
  baseURL: '/api/admin'
});

const createNewUser = (body) => {
  return baseRouterAdmin
    .post('/new', body)
    .then((response) => {
      return Promise.resolve(response.data.newUser);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const listAllUsers = () => {
  return baseRouterAdmin
    .get('/list')
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const deleteUserApi = (email) => {
  const body = { email };
  return baseRouterAdmin
    .post('/delete', body)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const updateUserApi = (body) => {
  return baseRouterAdmin
    .post('/update', body)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { createNewUser, listAllUsers, deleteUserApi, updateUserApi };
