import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import pop from '../audio/pop.mp3';
import arcade_game_tone from '../audio/arcade_game_tone.mp3';
import _8_bit_score_4 from '../audio/_8_bit_score_4.mp3';
import pong_sound from '../audio/pong_sound.mp3';

function Sounds(props) {
  const [gameStartReadyToPlay, setGameStartReadyToPlay] = useState(false);
  const [roundStartReadyToPlay, setRoundStartReadyToPlay] = useState(false);
  const [roundEndReadyToPlay, setRoundEndReadyToPlay] = useState(false);
  const [newMessageReadyToPlay, setNewMessageReadyToPlay] = useState(false);

  const game = props.multiplayer[props.multiplayer.currentGame];
  const { newMessage } = props.multiplayer;

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
      return <audio ref={myRef} src={arcade_game_tone} autoPlay />;
    }
  };

  const roundStartSound = (roundComplete) => {
    if (roundStartReadyToPlay && !roundComplete) {
      const myRef = React.createRef();
      return <audio ref={myRef} src={pop} autoPlay />;
    }
  };

  const roundEndSound = (roundComplete) => {
    if (roundEndReadyToPlay && roundComplete) {
      const myRef = React.createRef();
      return <audio ref={myRef} src={_8_bit_score_4} autoPlay />;
    }
  };

  const newMessageSound = (newMessage) => {
    if (newMessageReadyToPlay && newMessage) {
      const myRef = React.createRef();
      setTimeout(() => {
        setNewMessageReadyToPlay(false);
      }, 1500);
      return <audio ref={myRef} src={pong_sound} autoPlay />;
    }
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

const mapStateToProps = (state) => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps)(Sounds);
