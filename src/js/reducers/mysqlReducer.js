import { ADD_GAME, RECIEVE_STATS, RECIEVE_RECENT, RECIEVE_ALL_GAMES } from '../constants/actions.js';

const initialState = {
  recent : [],
  stats : [],
  games : [],
}

export function mysqlReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_GAME:
      return state
    case RECIEVE_RECENT:
      return {
        ...state,
        recent : action.res.data
      };
    case RECIEVE_STATS:
      return {
        ...state,
        stats : action.stats
      }
    case RECIEVE_ALL_GAMES:
    return {
      ...state,
      games : action.games
    }
    default:
      return state;
  }
}
