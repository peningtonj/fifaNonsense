import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { Field } from 'redux-form';
import { connect } from 'react-redux'
import {  Container, Row, Col} from 'reactstrap';
import store from "./store/store.js";
import { changeFocus } from './store/playerActions'
import ReactTable from 'react-table'
import { getAllGames } from './store/mysqlActions'
import {XYPlot, LineSeries} from 'react-vis';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const round = (number) => {
  number = number * 100;
  number = Math.round(number)
  number = number/100
  return number
}

const wins = (games, player) => (games.filter(game => (
  ((game.home === player) && (game.homeScore > game.awayScore)) || ((game.away === player) && (game.awayScore > game.homeScore))
)))

const losses = (games, player) => (games.filter(game => (
  (game.home === player && game.homeScore < game.awayScore) || (game.away === player && game.awayScore < game.homeScore)
)))

const agresti = (games, wins) => {
  const kappa = 2.24140273
  const kest = wins + (kappa * kappa)/2
  const nest = games + (kappa * kappa)
  const pest = kest/nest
  const radius = kappa*Math.sqrt(pest*(1-pest)/nest)
  return pest-radius;
}

class PlayerDetails extends Component {
  onChange(event) {
    store.dispatch(changeFocus(event.target.value))
    store.dispatch(getAllGames())
  }

getDetails(player) {
  const games = this.props.games.filter(game => (
     (game.away === player) || (game.home === player)
  ));


  const playerWins = wins(games, player)
  const playerLosses = losses(games, player)

  let graphData = [];
  let gameNo = 0;
  let count = 0;
  games.forEach(game => {
    gameNo += 1;
    count = (playerWins.includes(game)) ? count + 1 : count
    graphData.push({games : gameNo, Wins : count, Ratio : round(count/gameNo)})
  })

  const byPlayer = this.props.names.map(name => ({
    [name] : {
      games : games.filter(game => (
      game.away === name || game.home === name
    )
  )}
}))

  const byTeam = this.props.teams.map(team => ({
    [team.name] : {
      games : games.filter(game => (
      (game.awayTeam === team.name && game.away === player) || (game.homeTeam === team.name && game.home === player)
    )
  )}
  }))

  const resultsTeam =  byTeam.map(team => {
    const teamName = Object.keys(team)[0]
    const teamGames = team[Object.keys(team)[0]].games
    const winsWithTeam = wins(teamGames, player)
    const lossesWithTeam = losses(teamGames, player)
    const drawsWithTeam = teamGames.length - winsWithTeam - lossesWithTeam
    const points = 3 * winsWithTeam + drawsWithTeam
    return ({
      name : teamName,
      games : teamGames.length,
      points : points,
      wins : winsWithTeam,
    })
})

  const results =  byPlayer.map(opp => {
    const oppName = Object.keys(opp)[0]
    const oppGames = opp[Object.keys(opp)[0]].games
    const winsAgOpp = wins(oppGames, player)
    const lossesAgOpp = losses(oppGames, player)
    const drawsAgOpp = oppGames.length - winsAgOpp - lossesAgOpp
    const points = 3 * winsAgOpp + drawsAgOpp
    return ({
      name : oppName,
      games : oppGames.length,
      points : points,
      wins : winsAgOpp,
    })
})


  results.sort(function(a, b) {
    return (agresti(b.games * 3, b.points) - agresti(3 * a.games, a.points))
  })

  resultsTeam.sort(function(a, b) {
    return (agresti(b.games * 3, b.points) - agresti(3 * a.games, a.points))
  })


  const usefulResults = results.filter(opp => {
    return (opp.name != player && opp.games != 0)
  });

  const usefulResultsTeam = resultsTeam.filter(team => {
    return (team.games != 0)
  });

  let best = '-'
  let worst = '-'

  if (usefulResults.length > 0) {
    best = usefulResults[0].name
    worst = usefulResults[usefulResults.length - 1].name
  }

  let bestTeam = '-'
  let worstTeam = '-'
  if (usefulResultsTeam.length > 0) {
    bestTeam = usefulResultsTeam[0].name
    worstTeam = usefulResultsTeam[usefulResultsTeam.length - 1].name
  }

  resultsTeam.sort(function(a, b) {
    return (b.games - a.games)
  })

  let fav = '-'
  if (usefulResultsTeam.length > 0) {
    fav = usefulResultsTeam[0].name
  }


  console.log(graphData)

  const total = games.length
  const draws  = total - (playerWins.length + playerLosses.length)
  return [
    {
      games: total,
      wins : playerWins.length,
      losses : playerLosses.length,
      draws : draws,
      best : best,
      worst : worst,
      bestWith : bestTeam,
      worstWith : worstTeam,
      fav : fav,
      graph : graphData,
    }
  ]

  }

  render() {
    const playerOptions = this.props.names.map(name => (
      <option value={name} key={name}>{name}</option>
    ))
    const data = this.getDetails(this.props.focus)
    return(
      <div>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            <FormGroup>
            <Input value={this.props.focus} type="select" name="select" id="focus" onChange={this.onChange}>
              <option></option>
              {playerOptions}
            </Input>
            </FormGroup>
          </Col>
        </Row>
        {this.props.focus &&
          <div>
            <ReactTable showPagination={false}
            showPageSizeOptions={false}
            data={data}
            defaultPageSize={1}
            className="-striped -highlight"
            columns={[
              {
                columns: [
                  {
                    Header: 'Games',
                    accessor: 'games',
                  },
                  {
                    Header: 'Wins',
                    accessor: 'wins',
                  },
                  {
                    Header: 'Losses',
                    accessor: 'losses',
                  },
                  {
                    Header: 'Draws',
                    accessor: 'draws',
                  },
                  {
                    Header: 'Best Against',
                    accessor: 'best',
                  },
                  {
                    Header: 'Worst Against',
                    accessor: 'worst',
                  },
                  {
                    Header: 'Best With',
                    accessor: 'bestWith',
                  },
                  {
                    Header: 'Worst With',
                    accessor: 'worstWith',
                  },
                  {
                    Header: 'Favourite Team',
                    accessor: 'fav',
                  }
                ]
                }]}
                />
              <br />
                <Col md={{ size: 8, offset: 2 }}>
              <LineChart width={600} height={300} data={data[0].graph}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <XAxis dataKey="games"/>
                 <YAxis label={{ value: 'Wins', angle: -90, position: 'insideLeft' }} yAxisId="left" padding={{top: 30}}/>
                 <YAxis label={{ value: 'Percentage', angle: -90, position: 'right' }} yAxisId="right" orientation="right" padding={{top: 30}}/>
                 <CartesianGrid strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Legend />
                 <Line yAxisId="left" type="monotone" dataKey="Wins" stroke="#8884d8" activeDot={{r: 8}}/>
                 <Line yAxisId="right" type="monotone" dataKey="Ratio" stroke="#82ca9d" />
                </LineChart>
              </Col>
            </div>}
          </div>
    )
  }
}
function mapStateToProps(store){
  return {
    games : store.mysql.games,
    focus : store.player.focus,
    names : store.player.names,
    teams : store.team.teams
  };
}


export default connect(mapStateToProps)(PlayerDetails)
