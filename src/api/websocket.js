import ReconnectingWebSocket from 'reconnecting-websocket';

const webSocket = new ReconnectingWebSocket('ws://localhost:8000');
// const webSocket = new ReconnectingWebSocket(
//   'wss://subreddit-game-api.herokuapp.com'
// );

export default webSocket;
