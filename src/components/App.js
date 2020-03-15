import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import './SinglePlayer.css';

import Header from './Header';
import FrontPage from './FrontPage';
import MultiplayerSelection from './MultiplayerSelection';
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
            <Route path="/multiplayer" component={MultiplayerSelection} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
