import { REQUEST_PLAYER_STATS, ADD_GAME } from "../constants/actions.js";
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { mysqlReducer } from './mysqlReducer.js'
import { teamReducer } from './teamReducer.js'

const rootReducer = combineReducers({
  mysql : mysqlReducer,
  team : teamReducer,
  form: formReducer
})

export default rootReducer;
