import { createAction } from 'redux-actions';
import { ADD_GAME, RECIEVE_STATS, RECIEVE_RECENT, RECIEVE_ALL_GAMES } from '../constants/actions.js'
import store from './store.js'
import axios from 'axios';
import moment from 'moment';

const MYSQL_ADD_GAME = 'http://localhost:3001/fifa/mysql';
const MYSQL_REMOVE_GAME = 'http://localhost:3001/fifa/whoops';
const MYSQL_GET_RECENT = 'http://localhost:3001/fifa/recent';
const MYSQL_GET_STATS = 'http://localhost:3001/fifa/stats';
const MYSQL_SEND_STATS = 'http://localhost:3001/fifa/stats';
const MYSQL_GET_ALL = 'http://localhost:3001/fifa/all';

export const addGame = (game) => {
  return {
    type: ADD_GAME,
    payload: game
  }
};

export const recieveRecent = (recent) => {
  return {
    type: RECIEVE_RECENT,
    recent
  }
};


export const recieveStats = (stats) => {
  return {
    type: RECIEVE_STATS,
    stats
  }
};

export const recieveAllGames = (games) => {
  return {
    type: RECIEVE_ALL_GAMES,
    games
  }
};


function updatePlayer(stats, player, result, gf, ga) {
  const playerEntry = stats.filter(row => (row.player === player))[0]
  playerEntry.games = playerEntry.games + 1;
  if (result === 'win') {
    playerEntry.wins = playerEntry.wins + 1;
    playerEntry.points = playerEntry.points + 3;
  } else if (result === 'loss') {
    playerEntry.losses = playerEntry.losses + 1;
  } else {
    playerEntry.draws = playerEntry.draws + 1;
    playerEntry.points = playerEntry.points + 1;
  }

  playerEntry.gf = playerEntry.gf + gf;
  playerEntry.ga = playerEntry.ga + ga;
  return playerEntry;
};

function updateElo(home, away, stats, winner) {
  const homeElo = stats.filter(row => (row.player === home))[0].elo
  const awayElo = stats.filter(row => (row.player === away))[0].elo
  const r1 = 10 ** (homeElo / 400)
  const r2 = 10 ** (awayElo / 400)
  const e1 = r1 / (r1 + r2)
  const e2 = r2 / (r1 + r2)
  let s1 = 0;
  if (winner === 'home') {
    s1 = 1
  } else if (winner === 'away') {
    s1 = 0
  } else {
    s1 = 0.5
  }
  const s2 = 1 - s1
  const newEloHome = homeElo + 32 * (s1 - e1);
  const newEloAway = awayElo + 32 * (s2 - e2);
  return {
    homeElo: newEloHome,
    awayElo: newEloAway,
  }
}

function sendStats(stats, game) {
  let update = {}
  if (game.homeScore === game.awayScore) {
    const elos = updateElo(game.home, game.away, stats, 'draw')
    update.home = updatePlayer(stats, game.home, 'draw', parseInt(game.homeScore), parseInt(game.awayScore))
    update.away = updatePlayer(stats, game.away, 'draw', parseInt(game.awayScore), parseInt(game.homeScore))
    update.home.elo = elos.homeElo
    update.away.elo = elos.awayElo
    console.log(elos)
} else if (game.homeScore > game.awayScore) {
    const elos = updateElo(game.home, game.away, stats, 'home')
    update.home = updatePlayer(stats, game.home, 'win', parseInt(game.homeScore), parseInt(game.awayScore))
    update.away = updatePlayer(stats, game.away, 'loss', parseInt(game.awayScore), parseInt(game.homeScore))
    update.home.elo = elos.homeElo
    update.away.elo = elos.awayElo
  } else {
    const elos = updateElo(game.home, game.away, stats, 'away')
    update.home = updatePlayer(stats, game.home, 'loss', parseInt(game.homeScore), parseInt(game.awayScore))
    update.away = updatePlayer(stats, game.away, 'win', parseInt(game.awayScore), parseInt(game.homeScore))
    update.home.elo = elos.homeElo
    update.away.elo = elos.awayElo
  }

  return(dispatch) => {
    axios.post(MYSQL_SEND_STATS, {update : stats})
      .then(res => {
        dispatch(getStats())
    })
  }
};

export function getAllGames() {
    return (dispatch) => {
      axios.get(MYSQL_GET_ALL)
        .then(res => {
          dispatch(recieveAllGames(res.data))
        })
  }
}

export function getStats() {
  return (dispatch) => {
    axios.get(MYSQL_GET_STATS)
      .then(res => {
        dispatch(recieveStats(res.data))
      })
    }
  }

export function updateStats(game) {
  return (dispatch) => {
    axios.get(MYSQL_GET_STATS)
      .then(res => {
        dispatch(sendStats(res.data, game))
      })
    }
  }

export function getMostRecent(num) {
  return (dispatch) => {
    axios.post(MYSQL_GET_RECENT, {num : num})
      .then(res => {
        store.dispatch({type: RECIEVE_RECENT, res})
      })
    };
  };

export function sendGame (values) {
  values.date = moment().format('L')
  return (dispatch) => {
    axios.post(MYSQL_ADD_GAME, values)
      .then((res) => {
        dispatch(getMostRecent(10));
        dispatch(updateStats(values));
        dispatch(getAllGames())
      })
      .catch((e) => {
      })
  };
};
