import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Breakpoint } from 'react-socks';
import { connect } from 'react-redux';

import webSocket from '../api/websocket';
import { fetchGameMultiplayer } from '../actions';

import MultiplayerCreate from './MultiplayerCreate';
import MultiplayerGameList from './MultiplayerGameList';
import MultiplayerJoin from './MultiplayerJoin';

import './Multiplayer.css';

const Multiplayer = (props) => {
  const { id } = props.match.params;

  useLayoutEffect(() => {
    if (id) {
      webSocket.onopen = (event) => {
        const socketData = JSON.stringify({
          type: 'JOIN',
          game: id,
        });

        webSocket.send(socketData);
      };
    }
  }, [id]);

  webSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'UPDATE':
        props.fetchGameMultiplayer(data.game);
        break;
      case 'MESSAGE':
        props.newMessageNotifier();
        props.fetchGameMultiplayer(data.game);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const singleplayerLink = document.querySelector('.singleplayer.item');
    const multiplayerLink = document.querySelector('.multiplayer.item');
    multiplayerLink.classList.add('active');
    singleplayerLink.classList.remove('active');

    if (id) {
      props.fetchGameMultiplayer(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="option-container">
      <Breakpoint medium up>
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
      </Breakpoint>
      <Breakpoint small down>
        <div className="ui center aligned basic segment horizontal">
          <MultiplayerCreate />
          <br />
          <div className="ui horizontal divider">Or</div>
          <MultiplayerJoin joinId={id} />
        </div>
      </Breakpoint>
      <MultiplayerGameList />
    </div>
  );
};

export default connect(null, { fetchGameMultiplayer })(Multiplayer);
