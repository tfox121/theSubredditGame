import React from 'react';

import './MultiplayerScoresheet.css';

const MultiplayerScoresheet = (props) => {
  const { game, currentPlayer } = props;

  const numberFormat = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

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

  const guessRender = (player) => {
    const formattedGuess = numberFormat(player.currentGuess);
    if (player.name === currentPlayer) {
      return formattedGuess || 'waiting...';
    } if (game.roundComplete) {
      return formattedGuess;
    }
    return formattedGuess ? 'submitted' : 'waiting...';
  };

  const renderPlayers = () => {
    if (game) {
      sortByScore();
      return (
        <div className="ui basic segment">
          <div className="ui three column internally celled grid">
            <div className="row">
              <div className="column" />
              <div className="column">guess</div>
              <div className="column">score</div>
            </div>
            {game.players.map((player) => (
              <div className="row" key={player._id}>
                <div className="column">
                  {player.name === currentPlayer && (
                  <i className="angle double right large icon" />
                  )}
                  {player.name}
                </div>
                <div className="column">{guessRender(player)}</div>
                <div className="column">
                  {player.score}
                  {' '}
                  (+
                  {player.lastResult}
                  )
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return <div>Loading...</div>;
  };

  return <div className="ui grid">{renderPlayers()}</div>;
};

export default MultiplayerScoresheet;
