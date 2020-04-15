import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/games'
  : 'https://thesubredditgameapi.herokuapp.com/games';

export default axios.create({ baseURL });
