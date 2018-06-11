import { ADD_GAME, REQUEST_PLAYER_STATS } from '../constants/actions.js';

export const requestStats = player => ({ type: REQUEST_PLAYER_STATS, payload: player });
export const storeGame = game => ({ type: ADD_GAME, payload: game});
