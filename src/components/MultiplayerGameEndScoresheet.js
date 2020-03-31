import React from 'react';

import './MultiplayerGameEndScoresheet.css';

const MultiplayerGameEndScoresheet = props => {
  const { game, currentPlayer } = props;

  const sortByScore = () => {
    game.players.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });
  };

  const renderPlayers = () => {
    if (game) {
      sortByScore();
      return (
        <div className="ui two column internally celled grid">
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

export default MultiplayerGameEndScoresheet;
