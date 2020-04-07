import { Progress } from 'semantic-ui-react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import {
  fetchGameMultiplayer,
  generateSubreddit,
  submitGuessMultiplayer,
  setCurrentPlayer,
} from '../actions';
import history from '../history';
import webSocket from '../api/websocket';

import GuessBlock from './GuessBlock';
import ResultBlock from './ResultBlock';
import MultiplayerScoresheet from './MultiplayerScoresheet';
import MultiplayerNextRoundButton from './MultiplayerNextRoundButton';
import Sounds from './Sounds';
import SubredditBlock from './SubredditBlock';
import ChatBox from './ChatBox';

const MultiplayerGame = (props) => {
  const [copySuccess, setCopySuccess] = useState('');

  const { id } = props.match.params;
  const {
    fetchGameMultiplayer,
    multiplayer,
    playerName,
    setCurrentPlayer,
    clientId,
  } = props;

  let refreshRef = useRef(0);
  let gameRef = useRef(multiplayer[id]);
  const markerRef = useRef([]);
  if (multiplayer[id] && multiplayer[id] !== gameRef.current) {
    markerRef.current = multiplayer[id].players.map(React.createRef);
    gameRef.current = multiplayer[id];
  }

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (refreshRef.current > 150) {
      console.log('RENDER MAX, REFRESH PAGE');
      return;
    }
    if (!gameRef || !playerName) {
      const fetchData = async () => {
        await fetchGameMultiplayer(id);
      };
      fetchData();
      refreshRef.current++;
    }
    if (gameRef && !playerName) {
      let playerFound;
      gameRef.current = multiplayer[id];
      gameRef.current.players.forEach((player) => {
        if (player.clientId === clientId) {
          setCurrentPlayer(player.name);
          playerFound = true;
        }
      });
      if (!playerFound) {
        history.push(`/multiplayer/join/${id}`);
      }
      refreshRef.current++;
    }
  }, [
    clientId,
    fetchGameMultiplayer,
    id,
    multiplayer,
    playerName,
    setCurrentPlayer,
  ]);

  useLayoutEffect(() => {
    if (id) {
      console.log('setting game ID');
      webSocket.onopen = (event) => {
        const socketData = JSON.stringify({
          type: 'JOIN',
          game: id,
        });

        webSocket.send(socketData);
      };
    }
  }, [id]);

  webSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'UPDATE':
        props.fetchGameMultiplayer(data.game);
        break;
      case 'MESSAGE':
        props.newMessageNotifier();
        props.fetchGameMultiplayer(data.game);
        break;
      default:
        return;
    }
  };

  if (!gameRef || !playerName) {
    gameRef = multiplayer[id];
    return null;
  }

  const onSubmitHandler = () => {
    props.generateSubreddit(id, playerName);
  };

  const onGuessSubmit = (num) => {
    props.submitGuessMultiplayer(id, playerName, num);
    fetchGameMultiplayer(id);
  };

  const guessBlockRender = () => {
    if (gameRef.current.currentSub && !gameRef.current.roundComplete) {
      return (
        <div className="ui vertical segment">
          <SubredditBlock subredditInfo={multiplayer[id].currentSub} />
          <GuessBlock onSubmit={onGuessSubmit} />
        </div>
      );
    }
  };

  const resultBlockRender = () => {
    if (gameRef.current.roundComplete) {
      return gameRef.current.players
        .filter((player) => player.name === playerName)
        .map((player) => {
          return (
            <React.Fragment key={player._id}>
              <ResultBlock
                subredditInfo={multiplayer[id].currentSub}
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
          value={gameRef.current.gameStarted ? gameRef.current.currentRound : 0}
          total={gameRef.current.rounds}
          label={`round: ${gameRef.current.currentRound} of ${gameRef.current.rounds}`}
          size="medium"
          color="teal"
          active={gameRef.current.currentRound !== gameRef.current.rounds}
        />
      </div>
    );
  };

  const copyToClipboard = (event) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    event.target.focus();
    setCopySuccess('Copied!');
  };

  const inviteRender = () => {
    if (
      !gameRef.current.gameStarted &&
      document.queryCommandSupported('copy')
    ) {
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
        game={gameRef.current}
        currentPlayer={playerName}
      />
      {inviteRender()}
      {guessBlockRender()}
      {resultBlockRender()}
      <MultiplayerNextRoundButton onSubmit={onSubmitHandler} />
      <ChatBox game={gameRef.current} currentPlayer={playerName} />
      <Sounds />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    multiplayer: state.multiplayer,
    clientId: state.multiplayer.clientId,
    playerName: state.multiplayer.playerName,
  };
};

export default connect(mapStateToProps, {
  fetchGameMultiplayer,
  generateSubreddit,
  submitGuessMultiplayer,
  setCurrentPlayer,
})(MultiplayerGame);
