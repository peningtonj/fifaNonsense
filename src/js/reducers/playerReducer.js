import { SET_COMPARE_A, SET_COMPARE_B } from '../constants/actions.js';

const initialState = {
  compareA: null,
  compareB: null,
  names: [
    'Joe',
    'Jason',
    'Will',
    'Jack',
    'Other'
  ],
}

export function playerReducer (state = initialState, action) {
  switch (action.type) {
    case SET_COMPARE_A:
      return {
        ...state,
        compareA: action.player
        }
      case SET_COMPARE_B:
        return {
          ...state,
          compareB: action.player
        }
      default:
        return state
      }
  }
