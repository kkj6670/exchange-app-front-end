const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://exchange-app-server.herokuapp.com';

export default {
  BASE_URL,
};
