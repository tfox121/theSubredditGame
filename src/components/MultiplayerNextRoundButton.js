import React from 'react';

import { connect } from 'react-redux';

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
    props.onSubmit();
  };

  const buttonText = () => {
    if (player.readyForNext) {
      return 'Waiting...';
    }
    return 'Next Round!';
  };

  const blockRender = () => {
    if (game.rounds <= game.currentRound) {
      return;
    }
    if (game.roundComplete || !game.gameStarted) {
      return (
        <form onSubmit={onSubmit} className="ui form">
          <div className="field">{buttonRender()}</div>
        </form>
      );
    }
  };

  const buttonRender = () => {
    if (!game.gameStarted) {
      return <RoundStartModal onSubmit={onSubmit} />;
    } else {
      return (
        <button
          className={`ui ${!player.readyForNext ? 'animated' : ''} button`}
          tabIndex="0"
          type="submit"
        >
          <div className="visible content">{buttonText()}</div>
          {!player.readyForNext && (
            <div className="hidden content">Woooooooo!</div>
          )}
        </button>
      );
    }
  };

  return (
    <div className="ui vertical segment random-button-block">
      {blockRender()}
    </div>
  );
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps)(MultiplayerNextRoundButton);
