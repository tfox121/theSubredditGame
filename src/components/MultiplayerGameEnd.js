import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearCurrentGame } from '../actions';
import brass_finale from '../audio/brass_finale.mp3';
import history from '../history';
import './MultiplayerGameEnd.css';

import MultiplayerGameEndScoresheet from './MultiplayerGameEndScoresheet';
import ChatBox from './ChatBox';

const MultiplayerGameEnd = (props) => {
  const { id } = props.match.params;
  const { multiplayer, clearCurrentGame } = props;
  const game = multiplayer[id];

  useEffect(() => {
    return () => {
      clearCurrentGame();
    };
  }, [clearCurrentGame]);

  if (!game || !multiplayer.playerName) {
    history.push(`/multiplayer/join/${id}`);
    return null;
  }

  const gameEndSound = () => {
    const myRef = React.createRef();
    return <audio ref={myRef} src={brass_finale} autoPlay />;
  };

  const roundTo2 = (num) => {
    return +(Math.round(num + 'e+2') + 'e-2');
  };

  const onClick = () => {
    props.clearCurrentGame();
  };

  const winnerMessage = () => {
    if (game.players[0].name === multiplayer.playerName) {
      return 'you win!';
    } else {
      return 'better luck next time...';
    }
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
          best guess:{' '}
          <b className="best-guess">{game.closestGuess.playerName}</b> - only{' '}
          {roundTo2(game.closestGuess.percentage)}% out for{' '}
          {game.closestGuess.subName}!
        </div>

        <Link
          to="/multiplayer"
          className="ui right labeled icon button"
          onClick={onClick}
        >
          play again<i className="right arrow icon"></i>
        </Link>
      </div>
      <ChatBox game={game} currentPlayer={props.multiplayer.playerName} />
      {gameEndSound()}
    </>
  );
};

const mapStateToProps = (state) => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps, { clearCurrentGame })(
  MultiplayerGameEnd
);
