import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchMultiplayerGame,
  generateSubreddit,
  submitGuess,
  completeRound,
  addScores
} from '../actions';

import GuessBlock from './GuessBlock';
import MultiplayerResultBlock from './MultiplayerResultBlock';
import RandomButtonBlock from './RandomButtonBlock';
import SubredditBlock from './SubredditBlock';

const MultiplayerGame = props => {
  const { id } = props.match.params;
  const game = props.multiplayer[id];

  setTimeout(() => {
    console.log('Fetching games', id);
    props.fetchMultiplayerGame(id);
    checkRoundComplete();
  }, 5000);

  const checkRoundComplete = () => {
    if (game && game.roundComplete !== true) {
      console.log('Checking');
      const players = Object.keys(game.players);
      if (players.length < 2) {
        console.log('Not complete');
        return;
      }
      let roundComplete = true;
      players.forEach(player => {
        if (!game.players[player].currentGuess) {
          roundComplete = false;
        }
      });
      if (roundComplete) {
        console.log('Finished');
        props.completeRound(id);
        props.fetchMultiplayerGame(id);
      } else {
        console.log('Not complete');
      }
    }
  };

  const renderPlayers = () => {
    const game = props.multiplayer[id];
    if (game) {
      return (
        <ol>
          {Object.keys(game.players).map(player => {
            return (
              <li key={player}>
                {player} {game.players[player].currentGuess}{' '}
                {game.players[player].score}
              </li>
            );
          })}
        </ol>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  const onSubmitHandler = () => {
    props.generateSubreddit(id);
  };

  const onGuessSubmit = num => {
    props.submitGuess(id, props.multiplayer.playerName, num);
    props.fetchMultiplayerGame(id);
  };

  const guessBlockRender = () => {
    if (
      props.multiplayer[id] &&
      props.multiplayer[id].currentSub.display_name
    ) {
      return (
        <div className="ui vertical segment">
          <SubredditBlock subredditInfo={props.multiplayer[id].currentSub} />
          <GuessBlock onSubmit={onGuessSubmit} />
        </div>
      );
    }
  };

  const numberFormat = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const answerRender = () => {
    if (game && game.roundComplete) {
      return (
        <h2 className="ui header">
          /r/{numberFormat(game.currentSub.display_name)} has{' '}
          {numberFormat(game.currentSub.subscribers)} subscribers.{' '}
        </h2>
      );
    }
  };

  const resultBlockRender = () => {
    if (game && game.roundComplete) {
      return Object.keys(game.players).map(player => {
        return (
          <span key={player}>
            <MultiplayerResultBlock
              player={player}
              subredditInfo={props.multiplayer[id].currentSub}
              guessNum={game.players[player].currentGuess}
            />
          </span>
        );
      });
    }
  };

  return (
    <div>
      <div>{id}</div>
      <div>Your Name: {props.multiplayer.playerName}</div>
      <div>{renderPlayers()}</div>
      <div>
        Round Complete? {game ? game.roundComplete.toString() : 'Loading'}
      </div>
      <RandomButtonBlock onSubmit={onSubmitHandler} />
      {guessBlockRender()}
      {answerRender()}
      {resultBlockRender()}
    </div>
  );
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps, {
  fetchMultiplayerGame,
  generateSubreddit,
  submitGuess,
  completeRound,
  addScores
})(MultiplayerGame);
