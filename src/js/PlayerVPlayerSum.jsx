import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from "./store/store.js";
import ReactTable from 'react-table'
import { getAllGames } from './store/mysqlActions'

const round = (number) => {
  number = number * 100;
  number = Math.round(number)
  number = number/100
  return number
}


class PlayerVPlayerSum extends Component {
  componentDidMount() {
    store.dispatch(getAllGames())
  }

  calculateScore(player1, player2, games) {
    let gamesPlayed = 0;
    let won = 0;
    games.forEach(game => {
      if(game.home === player1) {
        if(game.away === player2) {
          gamesPlayed += 1;
          won = (game.homeScore > game.awayScore) ? won + 1 : won;
        }
      } else if(game.away === player1) {
          if(game.home === player2) {
            gamesPlayed += 1;
            won = (game.homeScore < game.awayScore) ? won + 1 : won;
          }
        }
    })
  return (gamesPlayed === 0) ? '-' : round((100 * won)/gamesPlayed);
}

  render() {
    const players = ['Joe', 'Jack', 'Will', 'Jason', 'Other']
    const data = players.map(player => (
      {
        player: player,
        Joe: this.calculateScore(player, 'Joe', this.props.games),
        Jack: this.calculateScore(player, 'Jack', this.props.games),
        Will: this.calculateScore(player, 'Will', this.props.games),
        Other: this.calculateScore(player, 'Other', this.props.games),
        Jason: this.calculateScore(player, 'Jason', this.props.games),
      }
    ))

    console.log(data)
    return (
      <ReactTable
        data={data}
        showPagination={false}
        showPageSizeOptions={false}
        columns={[
          {
            columns: [
              {
                Header: '-',
                accessor: 'player',
              },
              {
                Header: "Joe",
                accessor: "Joe"
              },
              {
                Header: "Jack",
                accessor: "Jack",
              },
              {
                Header: "Will",
                accessor: "Will"
              },
              {
                Header: "Jason",
                accessor: "Jason"
              },
              {
                Header: "Other",
                accessor: "Other"
              },
            ]
          },
        ]}
        defaultPageSize={5}
        className="-striped -highlight"
        />
    )
  }
}


function mapStateToProps(store){
  return {
    games : store.mysql.games
  };
}

export default connect(mapStateToProps)(PlayerVPlayerSum)
