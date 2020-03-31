import { Progress } from 'semantic-ui-react';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import {
  fetchMultiplayerGame,
  generateSubreddit,
  submitGuess
} from '../actions';
import { source } from '../api/multiplayer';
import history from '../history';

import GuessBlock from './GuessBlock';
import ResultBlock from './ResultBlock';
import MultiplayerScoresheet from './MultiplayerScoresheet';
import MultiplayerNextRoundButton from './MultiplayerNextRoundButton';
import Sounds from './Sounds';
import SubredditBlock from './SubredditBlock';

const MultiplayerGame = props => {
  const [copySuccess, setCopySuccess] = useState('');

  const { id } = props.match.params;
  const game = props.multiplayer[id];
  const { fetchMultiplayerGame } = props;

  const textAreaRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // console.log('Fetching games TIMEOUT', id);
      fetchMultiplayerGame(id);
    }, 5000);
  });

  useEffect(() => {
    console.log('Fetching games USEEFFECT', id);
    fetchMultiplayerGame(id);
    return () => {
      console.log('UNMOUNTED GAME COMPONENT');
      // source.cancel();
    };
  }, []);

  if (!game || !props.multiplayer.playerName) {
    history.push(`/multiplayer/join/${id}`);
    return null;
  }

  const onSubmitHandler = () => {
    props.generateSubreddit(id, props.multiplayer.playerName);
  };

  const onGuessSubmit = num => {
    props.submitGuess(id, props.multiplayer.playerName, num);
    fetchMultiplayerGame(id);
  };

  const guessBlockRender = () => {
    if (game.currentSub && !game.roundComplete) {
      return (
        <div className="ui vertical segment">
          <SubredditBlock subredditInfo={props.multiplayer[id].currentSub} />
          <GuessBlock onSubmit={onGuessSubmit} />
        </div>
      );
    }
  };

  const resultBlockRender = () => {
    if (game.roundComplete) {
      return game.players
        .filter(player => player.name === props.multiplayer.playerName)
        .map(player => {
          return (
            <ResultBlock
              subredditInfo={props.multiplayer[id].currentSub}
              guessNum={player.currentGuess}
            />
          );
        });
    }
  };

  const progressBarRender = () => {
    return (
      <div className="ui basic segment">
        <Progress
          value={game.gameStarted ? game.currentRound : 0}
          total={game.rounds}
          progress="percent"
          label={`Round: ${game.currentRound} of ${game.rounds}`}
          size="medium"
          color="teal"
          active={game.currentRound !== game.rounds}
        />
      </div>
    );
  };

  const copyToClipboard = event => {
    textAreaRef.current.select();
    document.execCommand('copy');
    event.target.focus();
    setCopySuccess('Copied!');
  };

  const inviteRender = () => {
    if (!game.gameStarted && document.queryCommandSupported('copy')) {
      return (
        <div className="ui basic segment">
          <div>
            <h2 className="ui header">Invite a friend! Click to copy:</h2>
          </div>
          <br />
          <textarea
            onClick={copyToClipboard}
            ref={textAreaRef}
            value={`${window.location.origin}/multiplayer/join/${id}`}
            readOnly
          />
          <div>{copySuccess}</div>
        </div>
      );
    }
  };

  return (
    <>
      {progressBarRender()}
      <MultiplayerScoresheet
        game={game}
        currentPlayer={props.multiplayer.playerName}
      />
      {inviteRender()}
      {guessBlockRender()}
      {resultBlockRender()}
      <MultiplayerNextRoundButton onSubmit={onSubmitHandler} />
      <Sounds />
    </>
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
