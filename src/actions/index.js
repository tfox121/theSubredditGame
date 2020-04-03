import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import history from '../history';
import WebSocket from '../api/websocket';
import { axiosDefault as multiplayer } from '../api/multiplayer';

import {
  CREATE_MULTIPLAYER_GAME,
  // FETCH_MULTIPLAYER_GAMES,
  FETCH_MULTIPLAYER_GAME,
  JOIN_MULTIPLAYER_GAME,
  MULTIPLAYER_GENERATE_SUBREDDIT,
  MULTIPLAYER_SUBMIT_GUESS,
  MULTIPLAYER_CLEAR_CURRENT_GAME,
  MULTIPLAYER_CREATE_MESSAGE,
  MULTIPLAYER_NEW_MESSAGE_RECEIVED,
  MULTIPLAYER_DISMISS_NOTIFICATION,
  MULTIPLAYER_SET_CLIENT_ID,
  SERVE_ERROR
} from './types';

export const createSource = axios.CancelToken.source();
export const joinSource = axios.CancelToken.source();

export const createGameMultiplayer = formValues => async dispatch => {
  try {
    const response = await multiplayer.post('/', formValues, {
      cancelToken: createSource.token
    });
    const socketData = JSON.stringify({
      type: 'CREATE',
      game: response.data._id
    });

    WebSocket.send(socketData);

    dispatch({ type: CREATE_MULTIPLAYER_GAME, payload: response.data });
    history.push(`/multiplayer/join/${response.data._id}`);
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Caught cancelled request');
    } else {
      console.error(err);
    }
  }
};

// export const fetchGamesMultiplayer = () => async dispatch => {
//   try {
//     const response = await multiplayer.get(`/`);
//     console.log('ALL GAMES:', response);
//     dispatch({ type: FETCH_MULTIPLAYER_GAMES, payload: response.data });
//   } catch (err) {
//     if (axios.isCancel(err)) {
//       console.log('Caught cancelled request');
//     } else {
//       console.error(err);
//     }
//   }
// };

export const fetchGameMultiplayer = id => async dispatch => {
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

export const joinGameMultiplayer = (
  id,
  newPlayer,
  clientId
) => async dispatch => {
  try {
    const response = await multiplayer.patch(
      `/${id}`,
      {
        newPlayer,
        clientId
      },
      {
        cancelToken: joinSource.token
      }
    );

    console.log('JOINING GAME:', response);

    if (!response.data.game) {
      console.log('Game already started');
      dispatch({
        type: SERVE_ERROR,
        payload: {
          errorMsg: 'Game already started'
        }
      });
      return;
    }
    const socketData = JSON.stringify({
      type: 'JOIN',
      game: id
    });

    WebSocket.send(socketData);
    dispatch({
      type: JOIN_MULTIPLAYER_GAME,
      payload: {
        game: response.data.game,
        player: response.data.playerName || newPlayer
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

export const submitGuessMultiplayer = (id, player, guess) => async dispatch => {
  try {
    const response = await multiplayer.patch(`/${id}`, {
      player,
      guess
    });

    updateCall('UPDATE', id);

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

export const createMessageMultiplayer = (
  id,
  playerName,
  message
) => async dispatch => {
  try {
    const response = await multiplayer.post(`/${id}/message`, {
      playerName,
      message
    });
    const socketData = JSON.stringify({
      type: 'UPDATE',
      game: response.data._id
    });

    WebSocket.send(socketData);

    dispatch({
      type: MULTIPLAYER_CREATE_MESSAGE,
      payload: { game: response.data }
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
  const socketData = JSON.stringify({
    type: 'CLEAR'
  });

  WebSocket.send(socketData);
  dispatch({
    type: MULTIPLAYER_CLEAR_CURRENT_GAME
  });
  history.push(`/multiplayer`);
};

export const updateCall = (type, game) => {
  const socketData = JSON.stringify({ type, game });

  WebSocket.send(socketData);
};

export const newMessageNotifier = () => async dispatch => {
  dispatch({
    type: MULTIPLAYER_NEW_MESSAGE_RECEIVED
  });
};

export const dissmissNotification = () => async dispatch => {
  dispatch({
    type: MULTIPLAYER_DISMISS_NOTIFICATION
  });
};

export const setClientId = localStorage => async dispatch => {
  if (!localStorage.clientId) {
    localStorage.clientId = uuidv4();
    console.log('NEW ID GENERATED');
  }
  console.log(localStorage.clientId);
  dispatch({
    type: MULTIPLAYER_SET_CLIENT_ID,
    payload: {
      clientId: localStorage.clientId
    }
  });
};
