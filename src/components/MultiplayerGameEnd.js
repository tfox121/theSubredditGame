import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearCurrentGame } from '../actions';

import MultiplayerScoresheet from './MultiplayerScoresheet';

const MultiplayerGameEnd = props => {
  const { id } = props.match.params;
  const game = props.multiplayer[id];

  const gameEndSound = () => {
    const myRef = React.createRef();
    return (
      <audio
        ref={myRef}
        src={'https://www.freesfx.co.uk/sound/16070_1460555778.mp3'}
        autoPlay
      />
    );
  };

  const roundTo2 = num => {
    return +(Math.round(num + 'e+2') + 'e-2');
  };

  const onClick = () => {
    props.clearCurrentGame();
  };

  return (
    <div className="ui container">
      <div className="ui app rasied segment">
        <h1 className="ui header">Game Complete!</h1>
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
      </div>
      {gameEndSound()}
    </div>
  );
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps, { clearCurrentGame })(
  MultiplayerGameEnd
);
