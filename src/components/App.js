import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import './SinglePlayer.css';

import Header from './Header';
import FrontPage from './FrontPage';
import Multiplayer from './Multiplayer';
import MultiplayerGame from './MultiplayerGame';
import SinglePlayer from './SinglePlayer';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <>
          <Header />
          <Switch>
            <Route path="/" exact component={FrontPage} />
            <Route path="/singleplayer" component={SinglePlayer} />
            <Route path="/multiplayer" exact component={Multiplayer} />
            <Route path="/multiplayer/:id" component={MultiplayerGame} />
          </Switch>
        </>
      </Router>
    </div>
  );
};

export default App;
