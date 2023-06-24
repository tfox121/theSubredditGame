import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { BreakpointProvider } from 'react-socks';

import history from '../history';
import webSocket from '../api/websocket';
import { setClientId } from '../actions';
import './App.css';

import Header from './Header';
import Multiplayer from './multiplayer/Multiplayer';
import MultiplayerGame from './multiplayer/MultiplayerGame';
import MultiplayerGameEnd from './multiplayer/MultiplayerGameEnd';
import MultiplayerGameList from './multiplayer/MultiplayerGameList';
import SinglePlayer from './SinglePlayer';

const App = (props) => {
  const [webSocketClosed, setWebSocketClosed] = useState(false);

  const { setClientId } = props;

  useEffect(() => {
    setClientId();
  }, [setClientId]);

  webSocket.onopen = () => {
    console.log('Connected to server');
    setWebSocketClosed(false);
  };

  webSocket.onerror = () => {
    setWebSocketClosed(true);
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
    return null;
  };

  return (
    <BreakpointProvider>
      <Router history={history} basename={process.env.REACT_APP_PUBLIC_URL}>
        <div className="ui container">
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
        </div>
        {webSocketErrorRender()}
      </Router>
    </BreakpointProvider>
  );
};

export default connect(null, {
  setClientId,
})(App);
