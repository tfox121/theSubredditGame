import ReconnectingWebSocket from 'reconnecting-websocket';

export default new ReconnectingWebSocket(process.env.REACT_APP_WEBSOCKET_URL);
