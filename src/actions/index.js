// import * as fetch from 'node-fetch';

import history from '../history';
import multiplayer from '../api/multiplayer';

import {
  CREATE_MULTIPLAYER_GAME,
  FETCH_MULTIPLAYER_GAMES,
  FETCH_MULTIPLAYER_GAME,
  JOIN_MULTIPLAYER_GAME,
  MULTIPLAYER_GENERATE_SUBREDDIT,
  MULTIPLAYER_SUBMIT_GUESS,
  MULTIPLAYER_CLEAR_CURRENT_GAME
} from './types';

export const createMultiplayerGame = formValues => async dispatch => {
  const response = await multiplayer.post('/games', formValues);

  dispatch({ type: CREATE_MULTIPLAYER_GAME, payload: response.data });

  // history.push(`/multiplayer/join/${response.data._id}`);
};

export const fetchMultiplayerGames = () => async dispatch => {
  const response = await multiplayer.get(`/games`);
  console.log('ALL GAMES:', response);

  dispatch({ type: FETCH_MULTIPLAYER_GAMES, payload: response.data });
};

export const fetchMultiplayerGame = id => async dispatch => {
  const response = await multiplayer.get(`/games/${id}`);
  // console.log('FETCHED GAME:', response);

  dispatch({ type: FETCH_MULTIPLAYER_GAME, payload: response.data });
};

export const joinMultiplayerGame = (id, newPlayer) => async dispatch => {
  const response = await multiplayer.patch(`/games/${id}`, {
    newPlayer
  });

  console.log('JOINING GAME:', response);

  if (!response.data) {
    console.log('Game already started');
    return;
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

export const generateSubreddit = (id, player) => async dispatch => {
  const response = await multiplayer.patch(`/games/${id}/new`, {
    player
  });

  dispatch({
    type: MULTIPLAYER_GENERATE_SUBREDDIT,
    payload: {
      game: response.data
    }
  });
};

export const submitGuess = (id, player, guess) => async dispatch => {
  const response = await multiplayer.patch(`/games/${id}`, {
    player,
    guess
  });

  dispatch({
    type: MULTIPLAYER_SUBMIT_GUESS,
    payload: {
      game: response.data
    }
  });
};

export const clearCurrentGame = () => async dispatch => {
  console.log('CLEAING');
  dispatch({
    type: MULTIPLAYER_CLEAR_CURRENT_GAME
  });
};
