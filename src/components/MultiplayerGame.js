import { Progress } from 'semantic-ui-react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchMultiplayerGame,
  generateSubreddit,
  submitGuess
} from '../actions';
import history from '../history';

import GuessBlock from './GuessBlock';
import ResultBlock from './ResultBlock';
import MultiplayerScoresheet from './MultiplayerScoresheet';
import MultiplayerNextRoundButton from './MultiplayerNextRoundButton';
import Sounds from './Sounds';
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
      history.push(`/multiplayer/${id}`);
    }
    fetchMultiplayerGame(id);
  }, []);

  const onSubmitHandler = () => {
    props.generateSubreddit(id, props.multiplayer.playerName);
  };

  const onGuessSubmit = num => {
    props.submitGuess(id, props.multiplayer.playerName, num);
    fetchMultiplayerGame(id);
  };

  const guessBlockRender = () => {
    if (game && game.currentSub && !game.roundComplete) {
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
      return game.players
        .filter(player => player.name === props.multiplayer.playerName)
        .map(player => {
          return (
            <div className="ui vertical segment" key={player._id}>
              {answerRender()}
              <div>
                <ResultBlock
                  subredditInfo={props.multiplayer[id].currentSub}
                  guessNum={player.currentGuess}
                />
              </div>
            </div>
          );
        });
    }
  };

  const progressBarRender = () => {
    if (game) {
      return (
        <Progress
          value={game.gameStarted ? game.currentRound : 0}
          total={game.rounds}
          progress="percent"
          label={`Round: ${game.currentRound} of ${game.rounds}`}
          size="large"
          color="teal"
          active={game.currentRound !== game.rounds}
        />
      );
    }
  };

  return (
    <div className="multiplayer-container ui app rasied segment">
      <div className="ui vertical segment">{progressBarRender()}</div>
      <div className="ui vertical segment">
        <MultiplayerScoresheet
          game={game}
          currentPlayer={props.multiplayer.playerName}
        />
      </div>
      <MultiplayerNextRoundButton onSubmit={onSubmitHandler} />
      {guessBlockRender()}
      {resultBlockRender()}
      <Sounds />
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
