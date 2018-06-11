import { SET_COMPARE_A, SET_COMPARE_B } from '../constants/actions.js'

export const setA = (player) => {
  return {
    type: SET_COMPARE_A,
    player
  }
};

export const setB = (player) => {
  return {
    type: SET_COMPARE_B,
    player
  }
};
