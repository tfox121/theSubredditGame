import React from 'react';

const MultiplayerGameEndScoresheet = (props) => {
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
          {game.players.map((player) => (
            <div className="row" key={player._id}>
              <div className="column">
                {player.name === currentPlayer && (
                  <i className="angle double right large icon" />
                )}
                {' '}
                {player.name}
              </div>
              <div className="column">{player.score}</div>
            </div>
          ))}
        </div>
      );
    }
    return <div>Loading...</div>;
  };

  return <div className="ui grid">{renderPlayers()}</div>;
};

export default MultiplayerGameEndScoresheet;
