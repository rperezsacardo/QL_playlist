import axios from 'axios';

const baseAuthentication = axios.create({
  baseURL: '/api/authentication'
});

const signUp = (body) => {
  return baseAuthentication
    .post('/sign-up', body)
    .then((response) => {
      return Promise.resolve(response.data.newUser);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const signIn = (email, password) => {
  const body = { email, password };
  return baseAuthentication
    .post('/sign-in', body)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const signOut = () => {
  return baseAuthentication
    .post('/sign-out')
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const loadUserInfo = () => {
  return baseAuthentication
    .get('/me')
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { signUp, signIn, signOut, loadUserInfo };
