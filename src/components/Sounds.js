import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import pop from '../audio/pop.mp3';
import arcade_game_tone from '../audio/arcade_game_tone.mp3';
import _8_bit_score_4 from '../audio/_8_bit_score_4.mp3';

function Sounds(props) {
  const [gameStartReadyToPlay, setGameStartReadyToPlay] = useState(false);

  const [roundStartReadyToPlay, setRoundStartReadyToPlay] = useState(false);
  const [roundEndReadyToPlay, setRoundEndReadyToPlay] = useState(false);

  const game = props.multiplayer[props.multiplayer.currentGame];

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

  const gameStartSound = gameStarted => {
    if (gameStartReadyToPlay && gameStarted) {
      const myRef = React.createRef();
      return <audio ref={myRef} src={arcade_game_tone} autoPlay />;
    }
  };

  const roundStartSound = roundComplete => {
    if (roundStartReadyToPlay && !roundComplete) {
      const myRef = React.createRef();
      return <audio ref={myRef} src={pop} autoPlay />;
    }
  };

  const roundEndSound = roundComplete => {
    if (roundEndReadyToPlay && roundComplete) {
      const myRef = React.createRef();
      return <audio ref={myRef} src={_8_bit_score_4} autoPlay />;
    }
  };

  return (
    <div>
      {gameStartSound(game.gameStarted)}
      {roundEndSound(game.roundComplete)}
      {roundStartSound(game.roundComplete)}
    </div>
  );
}

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps)(Sounds);
