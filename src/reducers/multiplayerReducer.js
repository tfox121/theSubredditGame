import _ from 'lodash';

import {
  CREATE_MULTIPLAYER_GAME,
  FETCH_MULTIPLAYER_GAMES,
  FETCH_MULTIPLAYER_GAME,
  JOIN_MULTIPLAYER_GAME,
  MULTIPLAYER_GENERATE_SUBREDDIT,
  MULTIPLAYER_SUBMIT_GUESS,
  MULTIPLAYER_CLEAR_CURRENT_GAME,
  SERVE_ERROR
} from '../actions/types';

export default (
  state = { playerName: '', currentGame: '', error: '' },
  action
) => {
  switch (action.type) {
    case CREATE_MULTIPLAYER_GAME:
      return {
        ...state,
        [action.payload._id]: action.payload,
        currentGame: action.payload._id,
        error: ''
      };
    case FETCH_MULTIPLAYER_GAMES:
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case FETCH_MULTIPLAYER_GAME:
      return {
        ...state,
        [action.payload._id]: action.payload,
        currentGame: action.payload._id,
        error: ''
      };
    case JOIN_MULTIPLAYER_GAME:
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
    case SERVE_ERROR:
      return {
        ...state,
        error: action.payload.errorMsg
      };
    default:
      return state;
  }
};
