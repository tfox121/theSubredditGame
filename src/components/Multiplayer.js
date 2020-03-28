import React from 'react';
import { connect } from 'react-redux';

import { fetchMultiplayerGames } from '../actions';

import MultiplayerCreate from './MultiplayerCreate';
import MultiplayerJoin from './MultiplayerJoin';

import './Multiplayer.css';

const Multiplayer = props => {
  return (
    <div className="multiplayer-container ui app rasied segment">
      <h2 className="ui header multiplayer">Multiplayer!</h2>
      <div className="option-container">
        <div className="ui center aligned basic segment vertical">
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <MultiplayerCreate />
            </div>
            <div className="column">
              <MultiplayerJoin />
            </div>
          </div>
          <div className="ui vertical divider">Or</div>
        </div>
        <div className="ui center aligned basic segment horizontal">
          <MultiplayerCreate />
          <br />
          <div class="ui horizontal divider">Or</div>
          <MultiplayerJoin />
        </div>
      </div>
    </div>
  );
};

export default connect(null, { fetchMultiplayerGames })(Multiplayer);
