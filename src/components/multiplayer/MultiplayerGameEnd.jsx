import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearCurrentGame } from '../../actions';
import history from '../../history';
import './MultiplayerGameEnd.css';

import MultiplayerGameEndScoresheet from './MultiplayerGameEndScoresheet';
import ChatBox from './ChatBox';

const MultiplayerGameEnd = (props) => {
  const { match, multiplayer, clearCurrentGame } = props;
  const { id } = match.params;
  const game = multiplayer[id];

  useEffect(() => () => {
    clearCurrentGame();
  }, [clearCurrentGame]);

  if (!game || !multiplayer.playerName) {
    history.push(`/multiplayer/join/${id}`);
    return null;
  }

  const roundTo2 = (num) => +(`${Math.round(`${num}e+2`)}e-2`);

  const onClick = () => {
    props.clearCurrentGame();
  };

  const winnerMessage = () => {
    if (!game.players.length) {
      return null;
    }
    if (game.players[0].name === multiplayer.playerName) {
      return 'you win!';
    }
    return 'better luck next time...';
  };

  return (
    <>
      <h2 className="ui header">{winnerMessage()}</h2>
      <br />
      <div className="ui vertical segment">
        <MultiplayerGameEndScoresheet
          game={game}
          currentPlayer={multiplayer.playerName}
        />
        <div className="ui basic segment">
          best guess:
          {' '}
          <b className="best-guess">{game.closestGuess.playerName}</b>
          {' '}
          - only
          {' '}
          {roundTo2(game.closestGuess.percentage)}
          % out for
          {' '}
          {game.closestGuess.subName}
          !
        </div>

        <Link
          to="/multiplayer"
          className="ui right labeled icon button"
          onClick={onClick}
        >
          play again
          <i className="right arrow icon" />
        </Link>
      </div>
      <ChatBox game={game} currentPlayer={multiplayer.playerName} />
    </>
  );
};

const mapStateToProps = (state) => ({ multiplayer: state.multiplayer });

export default connect(mapStateToProps, { clearCurrentGame })(
  MultiplayerGameEnd,
);
