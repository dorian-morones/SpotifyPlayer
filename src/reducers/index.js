import { combineReducers } from 'redux';
import player from './player';

const rootReducer = combineReducers({ player: player });

export default rootReducer;