import React from 'react';

import './MultiplayerScoresheet.css';

const MultiplayerScoresheet = props => {
  const { game, currentPlayer } = props;

  const guessRender = player => {
    if (player.name === currentPlayer) {
      return player.currentGuess || 'Waiting...';
    } else {
      return player.currentGuess ? 'Submitted' : 'Waiting...';
    }
  };

  const renderPlayers = () => {
    if (game) {
      return (
        <div className="ui three column internally celled grid">
          <div className="row">
            <div className="column"></div>
            <div className="column">Guess</div>
            <div className="column">Score</div>
          </div>
          {game.players.map(player => {
            return (
              <div
                className="row"
                key={player._id}
                style={
                  player.name === currentPlayer
                    ? {
                        textDecoration: 'underline'
                      }
                    : {}
                }
              >
                <div className="column">
                  {player.name === currentPlayer && '>>>'} {player.name}
                </div>
                <div className="column">{guessRender(player)}</div>
                <div className="column">{player.score}</div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return <div className="ui grid">{renderPlayers()}</div>;
};

export default MultiplayerScoresheet;
