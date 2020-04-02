import { Progress } from 'semantic-ui-react';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import {
  fetchGameMultiplayer,
  generateSubreddit,
  submitGuessMultiplayer
} from '../actions';
import history from '../history';

import GuessBlock from './GuessBlock';
import ResultBlock from './ResultBlock';
import MultiplayerScoresheet from './MultiplayerScoresheet';
import MultiplayerNextRoundButton from './MultiplayerNextRoundButton';
import Sounds from './Sounds';
import SubredditBlock from './SubredditBlock';
import ChatBox from './ChatBox';

const MultiplayerGame = props => {
  const [copySuccess, setCopySuccess] = useState('');

  const { id } = props.match.params;
  const game = props.multiplayer[id];
  const { fetchGameMultiplayer } = props;

  const textAreaRef = useRef(null);

  if (!game || !props.multiplayer.playerName) {
    history.push(`/multiplayer/join/${id}`);
    return null;
  }

  const onSubmitHandler = () => {
    props.generateSubreddit(id, props.multiplayer.playerName);
  };

  const onGuessSubmit = num => {
    props.submitGuessMultiplayer(id, props.multiplayer.playerName, num);
    fetchGameMultiplayer(id);
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
            <React.Fragment key={player._id}>
              <ResultBlock
                subredditInfo={props.multiplayer[id].currentSub}
                guessNum={player.currentGuess}
              />
            </React.Fragment>
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
      <ChatBox game={game} currentPlayer={props.multiplayer.playerName} />
      <Sounds />
    </>
  );
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps, {
  fetchGameMultiplayer,
  generateSubreddit,
  submitGuessMultiplayer
})(MultiplayerGame);
