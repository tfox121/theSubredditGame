import React from 'react';

import { connect } from 'react-redux';

import './MultiplayerNextRoundButton.css';

const MultiplayerNextRoundButton = props => {
  const game =
    props.multiplayer.currentGame &&
    props.multiplayer[props.multiplayer.currentGame];
  const onSubmit = event => {
    event.preventDefault();
    props.onSubmit();
  };

  const buttonText = () => {
    if (!game.gameStarted) {
      return 'Begin!';
    }
    return 'Next Round!';
  };

  const buttonRender = () => {
    if (game.rounds <= game.currentRound) {
      return;
    }
    if (game.roundComplete || !game.gameStarted) {
      return (
        <form onSubmit={onSubmit} className="ui form">
          <div className="field">
            <button className="ui animated button" tabIndex="0" type="submit">
              <div className="visible content">{buttonText()}</div>
              <div className="hidden content">Woooooooo!</div>
            </button>
          </div>
        </form>
      );
    }
  };

  return (
    <div className="ui vertical segment random-button-block">
      {buttonRender()}
    </div>
  );
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps)(MultiplayerNextRoundButton);
