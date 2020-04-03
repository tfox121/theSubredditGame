import axios from 'axios';

// const baseURL = 'http://localhost:8000/games';

const baseURL = 'https://subreddit-game-api.herokuapp.com/games';

export const axiosDefault = axios.create({ baseURL });
