import ReconnectingWebSocket from 'reconnecting-websocket';

const webSocket =
  process.env.NODE_ENV === 'development'
    ? new ReconnectingWebSocket('ws://localhost:8000')
    : new ReconnectingWebSocket('wss://subreddit-game-api.herokuapp.com');

export default webSocket;
