import axios from 'axios';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
export const source = axios.CancelToken.source();

const baseURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000/games'
    : 'https://subreddit-game-api.herokuapp.com/games';

export const axiosDefault = axios.create({
  baseURL,
  cancelToken: source.token
});

// export const axiosDefault = axios.create({
//   baseURL: 'https://subreddit-game-api.herokuapp.com/games',
//   cancelToken: source.token
// });
