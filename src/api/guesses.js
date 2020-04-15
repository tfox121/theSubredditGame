import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/guess'
  : 'https://thesubredditgameapi.herokuapp.com/guess';

export default axios.create({ baseURL });
