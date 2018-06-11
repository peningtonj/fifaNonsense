import { ADD_TEAM, RECIEVE_TEAMS } from '../constants/actions.js';

const initialState = {
  teams : [],
  games : [],
}


export function teamReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_TEAM:
      return state
    case RECIEVE_TEAMS:
      return {
        ...state,
        teams : action.teams
      }
    default:
      return state
    }
}
