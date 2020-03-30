import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearCurrentGame } from '../actions';
import MultiplayerScoresheet from './MultiplayerScoresheet';
import brass_finale from '../audio/brass_finale.mp3';
import history from '../history';

const MultiplayerGameEnd = props => {
  const { id } = props.match.params;
  const game = props.multiplayer[id];

  if (!game || !props.multiplayer.playerName) {
    history.push(`/multiplayer/join/${id}`);
    return null;
  }

  const gameEndSound = () => {
    const myRef = React.createRef();
    return <audio ref={myRef} src={brass_finale} autoPlay />;
  };

  const roundTo2 = num => {
    return +(Math.round(num + 'e+2') + 'e-2');
  };

  const onClick = () => {
    props.clearCurrentGame();
  };

  return (
    <>
      <h2 className="ui header">Game Complete!</h2>
      <br />
      <div className="ui vertical segment">
        <MultiplayerScoresheet
          game={game}
          currentPlayer={props.multiplayer.playerName}
        />
        <div className="ui segment">
          Best Guess: {game.closestGuess.playerName} - only{' '}
          {roundTo2(game.closestGuess.percentage)}% out for{' '}
          {game.closestGuess.subName}!
        </div>

        <Link
          to="/multiplayer"
          className="ui right labeled icon button"
          onClick={onClick}
        >
          Play Again<i className="right arrow icon"></i>
        </Link>
      </div>
      {gameEndSound()}
    </>
  );
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps, { clearCurrentGame })(
  MultiplayerGameEnd
);
