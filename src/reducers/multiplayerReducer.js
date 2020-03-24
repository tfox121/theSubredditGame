import _ from 'lodash';

import {
  CREATE_MULTIPLAYER_GAME,
  FETCH_MULTIPLAYER_GAMES,
  FETCH_MULTIPLAYER_GAME,
  JOIN_MULTIPLAYER_GAME,
  MULTIPLAYER_GENERATE_SUBREDDIT,
  MULTIPLAYER_SUBMIT_GUESS,
  MULTIPLAYER_COMPLETE_ROUND
} from '../actions/types';

export default (state = { playerName: '', currentGame: '' }, action) => {
  switch (action.type) {
    case CREATE_MULTIPLAYER_GAME:
      return {
        ...state,
        [action.payload.id]: action.payload,
        currentGame: action.payload.id
      };
    case FETCH_MULTIPLAYER_GAMES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_MULTIPLAYER_GAME:
      return { ...state, [action.payload.id]: action.payload };
    case JOIN_MULTIPLAYER_GAME:
      return {
        ...state,
        [action.payload.game.id]: action.payload.game,
        playerName: action.payload.player,
        currentGame: action.payload.game.id
      };
    case MULTIPLAYER_GENERATE_SUBREDDIT:
      return {
        ...state,
        [action.payload.game.id]: action.payload.game
      };
    case MULTIPLAYER_SUBMIT_GUESS:
      return {
        ...state,
        [action.payload.game.id]: action.payload.game
      };
    case MULTIPLAYER_COMPLETE_ROUND:
      return {
        ...state,
        [action.payload.game.id]: action.payload.game
      };
    default:
      return state;
  }
};
