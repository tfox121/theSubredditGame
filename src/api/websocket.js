import ReconnectingWebSocket from 'reconnecting-websocket';

const connectSocket = () => {
  // const webSocket = new ReconnectingWebSocket('ws://localhost:8000');
  const webSocket = new ReconnectingWebSocket(
    'wss://subreddit-game-api.herokuapp.com'
  );

  return webSocket;
};

export default connectSocket;
