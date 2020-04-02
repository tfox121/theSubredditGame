import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateCall } from '../actions/index.js';
import './MultiplayerNextRoundButton.css';

import RoundStartModal from './RoundStartModal';

const MultiplayerNextRoundButton = props => {
  const game =
    props.multiplayer.currentGame &&
    props.multiplayer[props.multiplayer.currentGame];

  const player =
    game &&
    game.players.filter(player => {
      return player.name === props.multiplayer.playerName;
    })[0];

  const onSubmit = event => {
    event.preventDefault();
    updateCall('UPDATE', game._id);
    props.onSubmit();
  };

  const buttonText = () => {
    if (player.readyForNext) {
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
          <i className="right arrow icon"></i>See Results!
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
          disabled={player.readyForNext}
        >
          {buttonText()}
        </button>
      );
    }
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
  };

  return <>{blockRender()}</>;
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps)(MultiplayerNextRoundButton);
