import axios from 'axios';

const baseURL = `${process.env.REACT_APP_API_URL}/guess`;

export default axios.create({ baseURL });
