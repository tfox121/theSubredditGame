import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import multiplayerReducer from './multiplayerReducer';

export default combineReducers({
  form: formReducer,
  multiplayer: multiplayerReducer,
});
