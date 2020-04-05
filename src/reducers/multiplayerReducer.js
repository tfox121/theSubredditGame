import _ from 'lodash';

import {
  MULTIPLAYER_CREATE_GAME,
  MULTIPLAYER_FETCH_GAMES,
  MULTIPLAYER_FETCH_GAME,
  MULTIPLAYER_JOIN_GAME,
  MULTIPLAYER_SET_CURRENT_PLAYER,
  MULTIPLAYER_SET_CLIENT_ID,
  MULTIPLAYER_GENERATE_SUBREDDIT,
  MULTIPLAYER_SUBMIT_GUESS,
  MULTIPLAYER_CLEAR_CURRENT_GAME,
  MULTIPLAYER_CREATE_MESSAGE,
  MULTIPLAYER_NEW_MESSAGE_RECEIVED,
  MULTIPLAYER_DISMISS_NOTIFICATION,
  SERVE_ERROR
} from '../actions/types';

export default (
  state = {
    playerName: '',
    currentGame: '',
    error: '',
    newMessage: false,
    clientId: ''
  },
  action
) => {
  switch (action.type) {
    case MULTIPLAYER_CREATE_GAME:
      return {
        ...state,
        [action.payload._id]: action.payload,
        currentGame: action.payload._id,
        error: ''
      };
    case MULTIPLAYER_FETCH_GAMES:
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case MULTIPLAYER_FETCH_GAME:
      return {
        ...state,
        [action.payload._id]: action.payload,
        currentGame: action.payload._id,
        error: ''
      };
    case MULTIPLAYER_JOIN_GAME:
      return {
        ...state,
        [action.payload.game._id]: action.payload.game,
        playerName: action.payload.player,
        currentGame: action.payload.game._id,
        error: ''
      };
    case MULTIPLAYER_GENERATE_SUBREDDIT:
      return {
        ...state,
        [action.payload.game._id]: action.payload.game,
        error: ''
      };
    case MULTIPLAYER_SUBMIT_GUESS:
      return {
        ...state,
        [action.payload.game._id]: action.payload.game,
        error: ''
      };
    case MULTIPLAYER_CLEAR_CURRENT_GAME:
      return {
        ...state,
        currentGame: '',
        error: ''
      };
    case MULTIPLAYER_CREATE_MESSAGE:
      return {
        ...state,
        [action.payload.game._id]: action.payload.game,
        error: ''
      };
    case MULTIPLAYER_NEW_MESSAGE_RECEIVED:
      return {
        ...state,
        newMessage: true,
        error: ''
      };
    case MULTIPLAYER_DISMISS_NOTIFICATION:
      return {
        ...state,
        newMessage: '',
        error: ''
      };
    case MULTIPLAYER_SET_CLIENT_ID:
      return {
        ...state,
        clientId: action.payload.clientId
      };
    case MULTIPLAYER_SET_CURRENT_PLAYER:
      return {
        ...state,
        playerName: action.payload.playerName
      };
    case SERVE_ERROR:
      return {
        ...state,
        error: action.payload.errorMsg
      };
    default:
      return state;
  }
};
