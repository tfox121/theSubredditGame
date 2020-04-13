import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateCall } from '../actions';
import './MultiplayerNextRoundButton.css';

import RoundStartModal from './RoundStartModal';

const MultiplayerNextRoundButton = (props) => {
  const { multiplayer } = props;

  const game = multiplayer.currentGame
    && multiplayer[multiplayer.currentGame];

  const playerObj = game
    && game.players.filter((player) => player.name === props.multiplayer.playerName)[0];

  const onSubmit = (event) => {
    event.preventDefault();
    updateCall('UPDATE', game._id);
    props.onSubmit();
  };

  const buttonText = () => {
    if (playerObj.readyForNext) {
      return 'Waiting...';
    }
    return 'Next Round!';
  };

  const buttonRender = () => {
    if (game.gameComplete) {
      return (
        <Link
          to={`/multiplayer/${game._id}/results`}
          className="ui right labeled icon button"
        >
          <i className="right arrow icon" />
          See Results!
        </Link>
      );
    }
    if (game && !game.gameStarted) {
      return <RoundStartModal onSubmit={onSubmit} />;
    }
    if (game && game.gameStarted) {
      return (
        <button
          className="ui button"
          tabIndex="0"
          type="submit"
          disabled={playerObj.readyForNext}
        >
          {buttonText()}
        </button>
      );
    }
    return null;
  };

  const blockRender = () => {
    if (game && (game.roundComplete || !game.gameStarted)) {
      return (
        <div className="ui vertical segment random-button-block">
          <form onSubmit={onSubmit}>
            <div className="field">{buttonRender()}</div>
          </form>
        </div>
      );
    }
    return null;
  };

  return <>{blockRender()}</>;
};

const mapStateToProps = (state) => ({ multiplayer: state.multiplayer });

export default connect(mapStateToProps)(MultiplayerNextRoundButton);
