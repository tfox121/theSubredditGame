import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import './SinglePlayer.css';

import Header from './Header';
import FrontPage from './FrontPage';
import Multiplayer from './Multiplayer';
import MultiplayerCreate from './MultiplayerCreate';
import MultiplayerGame from './MultiplayerGame';
import MultiplayerJoin from './MultiplayerJoin';
import SinglePlayer from './SinglePlayer';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={FrontPage} />
            <Route path="/singleplayer" component={SinglePlayer} />
            <Route path="/multiplayer" exact component={Multiplayer} />
            <Route path="/multiplayer/new" component={MultiplayerCreate} />
            <Route path="/multiplayer/join" exact component={MultiplayerJoin} />
            <Route path="/multiplayer/join/:id" component={MultiplayerJoin} />
            <Route path="/multiplayer/:id" component={MultiplayerGame} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
