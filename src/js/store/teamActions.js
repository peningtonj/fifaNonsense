import { RECIEVE_TEAMS } from '../constants/actions.js'
import store from './store.js'
import axios from 'axios';

const MYSQL_ADD_TEAM = 'http://192.168.1.100:3001/fifa/teams';
const MYSQL_GET_TEAMS = 'http://192.168.1.100:3001/fifa/teams';


export const recieveTeams = (teams) => {
  return {
    type: RECIEVE_TEAMS,
    teams
  }
};

export function getTeams() {
  return (dispatch) => {
    axios.get(MYSQL_GET_TEAMS)
      .then(res => {
        dispatch(recieveTeams(res.data))
      })
    }
  }

export function addTeam(team) {
  return (dispatch) => {
    axios.post(MYSQL_ADD_TEAM, {team : team})
      .then(res => {
        dispatch(getTeams())
      })
    }
  }
