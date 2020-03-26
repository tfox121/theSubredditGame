import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchMultiplayerGame,
  generateSubreddit,
  submitGuess
} from '../actions';
import history from '../history';

import GuessBlock from './GuessBlock';
import MultiplayerResultBlock from './MultiplayerResultBlock';
import MultiplayerScoresheet from './MultiplayerScoresheet';
import RandomButtonBlock from './RandomButtonBlock';
import SubredditBlock from './SubredditBlock';

const MultiplayerGame = props => {
  const { id } = props.match.params;
  const game = props.multiplayer[id];
  const { fetchMultiplayerGame } = props;

  useEffect(() => {
    setTimeout(() => {
      // console.log('Fetching games TIMEOUT', id);
      fetchMultiplayerGame(id);
    }, 5000);
  });

  useEffect(() => {
    console.log('Fetching games USEEFFECT', id);
    if (!props.multiplayer.playerName) {
      history.push(`/multiplayer/join`);
    }
    fetchMultiplayerGame(id);
  }, []);

  const onSubmitHandler = () => {
    props.generateSubreddit(id);
  };

  const onGuessSubmit = num => {
    props.submitGuess(id, props.multiplayer.playerName, num);
    fetchMultiplayerGame(id);
  };

  const guessBlockRender = () => {
    if (props.multiplayer[id] && props.multiplayer[id].currentSub) {
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
      return game.players.map(player => {
        return (
          <span key={player._id}>
            <MultiplayerResultBlock
              player={player.name}
              subredditInfo={props.multiplayer[id].currentSub}
              guessNum={player.currentGuess}
            />
          </span>
        );
      });
    }
  };

  return (
    <div>
      <div>
        {id} - Round: {game ? game.round : 'Loading'}{' '}
        {/* \\ Begun?{' '}
        {game ? game.gameStarted.toString() : 'Loading'}{' '} */}
      </div>
      <div>Your Name: {props.multiplayer.playerName}</div>
      <MultiplayerScoresheet
        game={game}
        currentPlayer={props.multiplayer.playerName}
      />
      <div>
        {/* Round Complete? {game ? game.roundComplete.toString() : 'Loading'} */}
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
  submitGuess
})(MultiplayerGame);
