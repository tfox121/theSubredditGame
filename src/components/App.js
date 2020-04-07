import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { BreakpointProvider } from 'react-socks';

import history from '../history';
import webSocket from '../api/websocket';
import {
  fetchGameMultiplayer,
  newMessageNotifier,
  setClientId
} from '../actions';
import './App.css';

import Header from './Header';
import Multiplayer from './Multiplayer';
import MultiplayerGame from './MultiplayerGame';
import MultiplayerGameEnd from './MultiplayerGameEnd';
import MultiplayerGameList from './MultiplayerGameList';
import SinglePlayer from './SinglePlayer';

const App = props => {
  const [webSocketClosed, setWebSocketClosed] = useState(false);

  useEffect(() => {
    props.setClientId(localStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  webSocket.onopen = function(event) {
    console.log('Connected to server');
    setWebSocketClosed(false);
  };

  webSocket.onerror = event => {
    setWebSocketClosed(true);
  };

  webSocket.onmessage = event => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'UPDATE':
        props.fetchGameMultiplayer(data.game);
        break;
      case 'MESSAGE':
        props.newMessageNotifier();
        break;
      default:
        return;
    }
  };

  const webSocketErrorRender = () => {
    if (webSocketClosed) {
      return (
        <div className="websocket-error">
          <div>
            <div>Connection lost.</div>
            <p>Please wait for server reconnect or refresh the page.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <BreakpointProvider>
      <div className="ui container">
        <Router history={history}>
          <div className="ui app basic segment">
            <Header />
            <Switch>
              <Route path="/" exact component={SinglePlayer} />
              <Route path="/singleplayer" exact component={SinglePlayer} />
              <Route path="/multiplayer" exact component={Multiplayer} />
              <Route
                path="/multiplayer/games"
                exact
                component={MultiplayerGameList}
              />
              <Route
                path="/multiplayer/:id"
                exact
                component={MultiplayerGame}
              />
              <Route
                path="/multiplayer/join/:id"
                exact
                component={Multiplayer}
              />
              <Route
                path="/multiplayer/:id/results"
                component={MultiplayerGameEnd}
              />
            </Switch>
          </div>
        </Router>
      </div>
      {webSocketErrorRender()}
    </BreakpointProvider>
  );
};

export default connect(null, {
  fetchGameMultiplayer,
  newMessageNotifier,
  setClientId
})(App);
