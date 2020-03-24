import shortid from 'shortid';
import * as fetch from 'node-fetch';

import history from '../history';
import multiplayer from '../api/multiplayer';
import reddit from '../api/reddit';

import {
  CREATE_MULTIPLAYER_GAME,
  FETCH_MULTIPLAYER_GAMES,
  FETCH_MULTIPLAYER_GAME,
  JOIN_MULTIPLAYER_GAME,
  MULTIPLAYER_GENERATE_SUBREDDIT,
  MULTIPLAYER_SUBMIT_GUESS,
  MULTIPLAYER_COMPLETE_ROUND,
  MULTIPLAYER_ADD_SCORES
} from './types';

export const createMultiplayerGame = () => async dispatch => {
  const gameId = shortid.generate();
  const response = await multiplayer.post('/multiplayer', {
    id: gameId,
    roundComplete: false,
    currentSub: {},
    players: {}
  });

  dispatch({ type: CREATE_MULTIPLAYER_GAME, payload: response.data });
};

export const fetchMultiplayerGames = () => async dispatch => {
  const response = await multiplayer.get(`/multiplayer`);

  dispatch({ type: FETCH_MULTIPLAYER_GAMES, payload: response.data });
};

export const fetchMultiplayerGame = id => async dispatch => {
  const response = await multiplayer.get(`/multiplayer/${id}`);

  dispatch({ type: FETCH_MULTIPLAYER_GAME, payload: response.data });
};

export const joinMultiplayerGame = (id, newPlayer) => async dispatch => {
  const selectedGame = await multiplayer.get(`/multiplayer/${id}`);
  const newPlayerObj = { [newPlayer]: { currentGuess: '', score: 0 } };
  let response;
  if (!selectedGame.data) {
    return;
  }
  if (selectedGame.data.players) {
    if (selectedGame.data.players[newPlayer]) {
      console.log('Already exists');
      response = selectedGame;
    } else {
      response = await multiplayer.patch(`/multiplayer/${id}`, {
        players: {
          ...selectedGame.data.players,
          ...newPlayerObj
        },
        roundComplete: false
      });
    }
  } else {
    response = await multiplayer.patch(`/multiplayer/${id}`, {
      players: newPlayerObj
    });
  }

  dispatch({
    type: JOIN_MULTIPLAYER_GAME,
    payload: {
      game: response.data,
      player: newPlayer
    }
  });
  history.push(`/multiplayer/${id}`);
};

export const generateSubreddit = id => async dispatch => {
  const selectedGame = await multiplayer.get(`/multiplayer/${id}`);

  let response;
  if (!selectedGame.data) {
    return;
  }

  if (selectedGame.data.currentSub.length) {
    console.log('Sub already generated');
    return;
  } else {
    console.log('Generating');
    const subData = await fetch(
      'https://cors-anywhere.herokuapp.com/https://www.reddit.com/r/random/about.json'
    );
    const subDataJson = await subData.json();
    response = await multiplayer.patch(`/multiplayer/${id}`, {
      currentSub: subDataJson.data
    });
  }

  dispatch({
    type: MULTIPLAYER_GENERATE_SUBREDDIT,
    payload: {
      game: response.data
    }
  });
};

export const submitGuess = (id, player, guess) => async dispatch => {
  const selectedGame = await multiplayer.get(`/multiplayer/${id}`);
  let response;

  if (!selectedGame.data) {
    return;
  }

  if (selectedGame.data.players[player].currentGuess) {
    console.log('Guess already submitted');
    return;
  } else {
    console.log('Submitting');
    response = await multiplayer.patch(`/multiplayer/${id}`, {
      players: {
        ...selectedGame.data.players,
        [player]: {
          ...selectedGame.data.players[player],
          currentGuess: guess
        }
      }
    });
  }

  dispatch({
    type: MULTIPLAYER_SUBMIT_GUESS,
    payload: {
      game: response.data
    }
  });
};

export const completeRound = id => async dispatch => {
  const selectedGame = await multiplayer.get(`/multiplayer/${id}`);

  let response;
  if (!selectedGame.data) {
    return;
  }

  if (
    selectedGame.data.roundComplete === true ||
    Object.keys(selectedGame.data.players).length < 2
  ) {
    return;
  } else {
    response = await multiplayer.patch(`/multiplayer/${id}`, {
      roundComplete: true
    });
  }

  dispatch({
    type: MULTIPLAYER_COMPLETE_ROUND,
    payload: {
      game: response.data
    }
  });
};

export const addScores = id => async dispatch => {
  console.log('Adding scores');
  const selectedGame = await multiplayer.get(`/multiplayer/${id}`);
  let playersObj = { ...selectedGame.data.players };

  if (!selectedGame.data) {
    return;
  }

  if (selectedGame.data.roundComplete !== true) {
    return;
  }

  const percentCalc = (num1, num2) => {
    return Math.abs(100 - (num1 / num2) * 100);
  };

  const results = Object.keys(selectedGame.data.players).map(player => {
    return {
      [player]: percentCalc(
        selectedGame.data.players[player].currentGuess,
        selectedGame.data.currentSub.subscribers
      )
    };
  });

  results.sort((a, b) => {
    if (Object.values(a)[0] < Object.values(b)[0]) {
      return -1;
    }
    if (Object.values(a)[0] > Object.values(b)[0]) {
      return 1;
    }
    return 0;
  });

  results.forEach((score, index) => {
    playersObj[Object.keys(score)[0]].score += results.length - index - 1;
  });

  const response = await multiplayer.patch(`/multiplayer/${id}`, {
    players: playersObj
  });

  dispatch({
    type: MULTIPLAYER_ADD_SCORES,
    payload: {
      game: response.data
    }
  });
};
