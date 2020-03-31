import axios from 'axios';

import history from '../history';
import { axiosDefault as multiplayer } from '../api/multiplayer';

import {
  CREATE_MULTIPLAYER_GAME,
  FETCH_MULTIPLAYER_GAMES,
  FETCH_MULTIPLAYER_GAME,
  JOIN_MULTIPLAYER_GAME,
  MULTIPLAYER_GENERATE_SUBREDDIT,
  MULTIPLAYER_SUBMIT_GUESS,
  MULTIPLAYER_CLEAR_CURRENT_GAME,
  SERVE_ERROR
} from './types';

export const createMultiplayerGame = formValues => async dispatch => {
  try {
    const response = await multiplayer.post('/', formValues);
    dispatch({ type: CREATE_MULTIPLAYER_GAME, payload: response.data });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
  // history.push(`/multiplayer/join/${response.data._id}`);
};

export const fetchMultiplayerGames = () => async dispatch => {
  try {
    const response = await multiplayer.get(`/`);
    console.log('ALL GAMES:', response);
    dispatch({ type: FETCH_MULTIPLAYER_GAMES, payload: response.data });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const fetchMultiplayerGame = id => async dispatch => {
  try {
    const response = await multiplayer.get(`/${id}`);
    // console.log('FETCHED GAME:', response);
    dispatch({ type: FETCH_MULTIPLAYER_GAME, payload: response.data });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const joinMultiplayerGame = (id, newPlayer) => async dispatch => {
  try {
    const response = await multiplayer.patch(`/${id}`, {
      newPlayer
    });

    console.log('JOINING GAME:', response);

    if (!response.data) {
      console.log('Game already started');
      dispatch({
        type: SERVE_ERROR,
        payload: {
          errorMsg: 'Game already started'
        }
      });
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
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const generateSubreddit = (id, player) => async dispatch => {
  try {
    const response = await multiplayer.patch(`/${id}/new`, {
      player
    });

    dispatch({
      type: MULTIPLAYER_GENERATE_SUBREDDIT,
      payload: {
        game: response.data
      }
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const submitGuess = (id, player, guess) => async dispatch => {
  try {
    const response = await multiplayer.patch(`/${id}`, {
      player,
      guess
    });

    dispatch({
      type: MULTIPLAYER_SUBMIT_GUESS,
      payload: {
        game: response.data
      }
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const clearCurrentGame = () => async dispatch => {
  dispatch({
    type: MULTIPLAYER_CLEAR_CURRENT_GAME
  });
};
