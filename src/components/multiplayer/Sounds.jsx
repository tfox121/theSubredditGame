import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import pop from '../../audio/pop.mp3';
import arcadeGameTone from '../../audio/arcadeGameTone.mp3';
import eightBitScore from '../../audio/eightBitScore.mp3';
import pongSound from '../../audio/pongSound.mp3';

function Sounds({ multiplayer }) {
  const [gameStartReadyToPlay, setGameStartReadyToPlay] = useState(false);
  const [roundStartReadyToPlay, setRoundStartReadyToPlay] = useState(false);
  const [roundEndReadyToPlay, setRoundEndReadyToPlay] = useState(false);
  const [newMessageReadyToPlay, setNewMessageReadyToPlay] = useState(false);

  const game = multiplayer[multiplayer.currentGame];
  const { newMessage } = multiplayer;

  useEffect(() => {
    if (game && !game.gameStarted) {
      setGameStartReadyToPlay(true);
    }
    if (game && !game.roundComplete) {
      setRoundEndReadyToPlay(true);
    }
    if (game && game.roundComplete) {
      setRoundStartReadyToPlay(true);
    }
  }, [game]);

  useEffect(() => {
    if (game && !game.newMessage) {
      setNewMessageReadyToPlay(true);
    }
  }, [game, newMessage]);

  const gameStartSound = (gameStarted) => {
    if (gameStartReadyToPlay && gameStarted) {
      const myRef = React.createRef();
      return <audio ref={myRef} src={arcadeGameTone} autoPlay />;
    }
    return null;
  };

  const roundStartSound = (roundComplete) => {
    if (roundStartReadyToPlay && !roundComplete) {
      const myRef = React.createRef();
      return <audio ref={myRef} src={pop} autoPlay />;
    }
    return null;
  };

  const roundEndSound = (roundComplete) => {
    if (roundEndReadyToPlay && roundComplete) {
      const myRef = React.createRef();
      return <audio ref={myRef} src={eightBitScore} autoPlay />;
    }
    return null;
  };

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
      {gameStartSound(game.gameStarted)}
      {roundEndSound(game.roundComplete)}
      {roundStartSound(game.roundComplete)}
      {newMessageSound(newMessage)}
    </div>
  );
}

const mapStateToProps = (state) => ({ multiplayer: state.multiplayer });

export default connect(mapStateToProps)(Sounds);
