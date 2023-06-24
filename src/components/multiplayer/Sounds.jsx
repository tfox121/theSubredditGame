import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import pongSound from '../../audio/pongSound.mp3';

function Sounds({ multiplayer }) {
  const [newMessageReadyToPlay, setNewMessageReadyToPlay] = useState(false);

  const game = multiplayer[multiplayer.currentGame];
  const { newMessage } = multiplayer;

  useEffect(() => {
    if (game && !game.newMessage) {
      setNewMessageReadyToPlay(true);
    }
  }, [game, newMessage]);

  const newMessageSound = (newMessageReceived) => {
    if (newMessageReadyToPlay && newMessageReceived) {
      const myRef = React.createRef();
      setTimeout(() => {
        setNewMessageReadyToPlay(false);
      }, 1500);
      return <audio ref={myRef} src={pongSound} autoPlay />;
    }
    return null;
  };

  if (!game) {
    return null;
  }

  return (
    <div>
      {newMessageSound(newMessage)}
    </div>
  );
}

const mapStateToProps = (state) => ({ multiplayer: state.multiplayer });

export default connect(mapStateToProps)(Sounds);
