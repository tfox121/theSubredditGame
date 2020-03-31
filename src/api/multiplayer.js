import axios from 'axios';

export const source = axios.CancelToken.source();

export const axiosDefault = axios.create({
  baseURL: 'http://localhost:8000/games',
  cancelToken: source.token
});

// export default axios.create({
//   baseURL: 'https://subreddit-game-api.herokuapp.com/'
// });
