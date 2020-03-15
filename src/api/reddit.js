import axios from 'axios';

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export default axios.create({
  baseURL: proxyurl + 'https://reddit.com',
  headers: {
    'x-requested-with': 'XMLHttpRequest'
  }
});
