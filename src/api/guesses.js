import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/guess'
    : 'https://subreddit-game-api.herokuapp.com/guess';

export const axiosDefault = axios.create({ baseURL });
