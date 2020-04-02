import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../history';
import WebSocket from '../api/websocket';
import { fetchGameMultiplayer, newMessageNotifier } from '../actions';
import './App.css';

import Header from './Header';
import Multiplayer from './Multiplayer';
import MultiplayerGame from './MultiplayerGame';
import MultiplayerGameEnd from './MultiplayerGameEnd';
import SinglePlayer from './SinglePlayer';

const App = props => {
  WebSocket.onmessage = event => {
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

  return (
    <div className="ui container">
      <Router history={history}>
        <div className="ui app basic segment">
          <Header />
          <Switch>
            <Route path="/" exact component={SinglePlayer} />
            <Route path="/singleplayer" exact component={SinglePlayer} />
            <Route path="/multiplayer" exact component={Multiplayer} />
            <Route path="/multiplayer/:id" exact component={MultiplayerGame} />
            <Route path="/multiplayer/join/:id" exact component={Multiplayer} />
            <Route
              path="/multiplayer/:id/results"
              component={MultiplayerGameEnd}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default connect(null, {
  fetchGameMultiplayer,
  newMessageNotifier
})(App);
