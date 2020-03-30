import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchMultiplayerGame } from '../actions';

import MultiplayerCreate from './MultiplayerCreate';
import MultiplayerJoin from './MultiplayerJoin';

import './Multiplayer.css';

const Multiplayer = props => {
  const { id } = props.match.params;

  useEffect(() => {
    const singleplayerLink = document.querySelector('.singleplayer.item');
    const multiplayerLink = document.querySelector('.multiplayer.item');
    multiplayerLink.classList.add('active');
    singleplayerLink.classList.remove('active');
  }, []);

  return (
    <>
      <div className="option-container">
        <div className="ui center aligned basic segment vertical">
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <MultiplayerCreate />
            </div>
            <div className="column">
              <MultiplayerJoin joinId={id} />
            </div>
          </div>
          <div className="ui vertical divider">Or</div>
        </div>
        <div className="ui center aligned basic segment horizontal">
          <MultiplayerCreate />
          <br />
          <div className="ui horizontal divider">Or</div>
          <MultiplayerJoin joinId={id} />
        </div>
      </div>
    </>
  );
};

export default connect(null, { fetchMultiplayerGame })(Multiplayer);
