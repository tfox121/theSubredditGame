import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import history from '../history';
import webSocket from '../api/websocket';
import multiplayer from '../api/multiplayer';

import {
  MULTIPLAYER_CREATE_GAME,
  MULTIPLAYER_FETCH_GAMES_BY_CLIENT,
  MULTIPLAYER_FETCH_GAME,
  MULTIPLAYER_JOIN_GAME,
  MULTIPLAYER_SET_CURRENT_PLAYER,
  MULTIPLAYER_GENERATE_SUBREDDIT,
  MULTIPLAYER_SUBMIT_GUESS,
  MULTIPLAYER_CLEAR_CURRENT_GAME,
  MULTIPLAYER_CREATE_MESSAGE,
  MULTIPLAYER_NEW_MESSAGE_RECEIVED,
  MULTIPLAYER_DISMISS_NOTIFICATION,
  MULTIPLAYER_SET_CLIENT_ID,
  SERVE_ERROR,
} from './types';

export const createSource = axios.CancelToken.source();
export const joinSource = axios.CancelToken.source();

export const updateCall = (type, game) => {
  const socketData = JSON.stringify({ type, game });

  webSocket.send(socketData);
};

export const createGameMultiplayer = (formValues) => async (dispatch) => {
  try {
    const response = await multiplayer.post('/', formValues, {
      cancelToken: createSource.token,
    });
    const socketData = JSON.stringify({
      type: 'CREATE',
      game: response.data._id,
    });

    webSocket.send(socketData);

    dispatch({ type: MULTIPLAYER_CREATE_GAME, payload: response.data });
    history.push(`/multiplayer/join/${response.data._id}`);
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const fetchGamesByClientMultiplayer = (clientId) => async (dispatch) => {
  try {
    const response = await multiplayer.get(`/current/${clientId}`);
    console.log('GAMES:', response);
    dispatch({
      type: MULTIPLAYER_FETCH_GAMES_BY_CLIENT,
      payload: response.data,
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const fetchGameMultiplayer = (id) => async (dispatch) => {
  try {
    const response = await multiplayer.get(`/${id}`);
    console.log('FETCHED GAME:', response);
    dispatch({ type: MULTIPLAYER_FETCH_GAME, payload: response.data });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const joinGameMultiplayer = (id, newPlayer, clientId) => async (
  dispatch,
) => {
  try {
    const response = await multiplayer.patch(
      `/${id}`,
      {
        newPlayer,
        clientId,
      },
      {
        cancelToken: joinSource.token,
      },
    );

    console.log('JOINING GAME:', response);

    if (!response.data.game) {
      console.log('Game already started');
      dispatch({
        type: SERVE_ERROR,
        payload: {
          errorMsg: 'Game already started',
        },
      });
      return;
    }
    const socketData = JSON.stringify({
      type: 'JOIN',
      game: id,
    });

    webSocket.send(socketData);
    dispatch({
      type: MULTIPLAYER_JOIN_GAME,
      payload: {
        game: response.data.game,
        player: response.data.playerName || newPlayer,
      },
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

export const generateSubreddit = (id, player) => async (dispatch) => {
  try {
    const response = await multiplayer.patch(`/${id}/new`, {
      player,
    });

    console.log(response.data);

    dispatch({
      type: MULTIPLAYER_GENERATE_SUBREDDIT,
      payload: response.data,
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const submitGuessMultiplayer = (id, player, guess) => async (
  dispatch,
) => {
  try {
    const response = await multiplayer.patch(`/${id}`, {
      player,
      guess,
    });

    console.log('RESPONSE:', response.data);
    dispatch({
      type: MULTIPLAYER_SUBMIT_GUESS,
      payload: response.data,
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const createMessageMultiplayer = (id, playerName, message) => async (
  dispatch,
) => {
  try {
    const response = await multiplayer.post(`/${id}/message`, {
      playerName,
      message,
    });
    const socketData = JSON.stringify({
      type: 'MESSAGE',
      game: response.data._id,
    });

    webSocket.send(socketData);

    dispatch({
      type: MULTIPLAYER_CREATE_MESSAGE,
      payload: { game: response.data },
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

export const clearCurrentGame = () => async (dispatch) => {
  const socketData = JSON.stringify({
    type: 'CLEAR',
  });

  webSocket.send(socketData);
  dispatch({
    type: MULTIPLAYER_CLEAR_CURRENT_GAME,
  });
  history.push('/multiplayer');
};

export const newMessageNotifier = () => async (dispatch) => {
  dispatch({
    type: MULTIPLAYER_NEW_MESSAGE_RECEIVED,
  });
};

export const dissmissNotification = () => async (dispatch) => {
  dispatch({
    type: MULTIPLAYER_DISMISS_NOTIFICATION,
  });
};

export const setCurrentPlayer = (playerName) => async (dispatch) => {
  dispatch({
    type: MULTIPLAYER_SET_CURRENT_PLAYER,
    payload: {
      playerName,
    },
  });
};

export const setClientId = () => async (dispatch) => {
  if (!localStorage.clientId) {
    localStorage.clientId = uuidv4();
  }
  dispatch({
    type: MULTIPLAYER_SET_CLIENT_ID,
    payload: {
      clientId: localStorage.clientId,
    },
  });
};
