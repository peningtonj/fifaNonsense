import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { Field } from 'redux-form';
import { connect } from 'react-redux'
import {  Container, Row, Col} from 'reactstrap';
import store from "./store/store.js";
import { setA, setB } from './store/playerActions'
import ReactTable from 'react-table'
import { getAllGames } from './store/mysqlActions'

class PlayerVPlayer extends Component {
    calculateScore(playerA, playerB, games) {
      let gamesA = 0;
      let gamesB = 0;
      let gamesTotal = 0;
      let aBest = {};
      let bBest = {};
      games.forEach(game => {
        if(game.home === playerA) {
          if(game.away === playerB) {
            gamesTotal += 1
            if (game.homeScore > game.awayScore) {
              gamesA =  gamesA + 1;
              if (aBest[game.homeTeam]) {
                aBest[game.homeTeam] += 1
              } else {
                aBest[game.homeTeam] = 1
              }
            } else if (game.homeScore < game.awayScore) {
              gamesB =  gamesB + 1;
              if (bBest[game.homeTeam]) {
                bBest[game.awayTeam] += 1
              } else {
                bBest[game.awayTeam] = 1
              }
            }
          }
        } else if(game.away === playerA) {
            if(game.home === playerB) {
              gamesTotal += 1
              if (game.homeScore < game.awayScore) {
                gamesA =  gamesA + 1;
                if (aBest[game.awayTeam]) {
                  aBest[game.awayTeam] += 1
                } else {
                  aBest[game.awayTeam] = 1
                }
              } else if (game.homeScore > game.awayScore) {
                gamesB =  gamesB + 1;
                if (bBest[game.homeTeam]) {
                  bBest[game.homeTeam] += 1
                } else {
                  bBest[game.homeTeam] = 1
                }
              }
            }
          }
      })
      console.log(aBest)

      const aBestTeam = gamesA ? (Object.entries(aBest).sort((a,b) => {
        return b[1] - a[1]
      }))[0][0] : '-'

      const bBestTeam = gamesB ? (Object.entries(bBest).sort((a,b) => {
        return b[1] - a[1]
      }))[0][0] : '-'

      const draw = gamesTotal - gamesA - gamesB
      return({
        aWon: gamesA,
        bWon: gamesB,
        total : gamesTotal,
        draw : draw,
        aBest : aBestTeam,
        bBest : bBestTeam
      })
  }

  onChangeA(event) {
    store.dispatch(setA(event.target.value))
    store.dispatch(getAllGames())
  }
  onChangeB(event) {
    store.dispatch(setB(event.target.value))
    store.dispatch(getAllGames())
  }
  render() {
    const playerOptions = this.props.names.map(name => (
      <option value={name} key={name}>{name}</option>
    ))
    let data = []
    if (this.props.playerA && this.props.playerB) {
      const matchUp = this.calculateScore(this.props.playerA, this.props.playerB, this.props.games)
       data =
        [
          {
            games: matchUp.total,
            a : matchUp.aWon,
            b : matchUp.bWon,
            draw : matchUp.draw,
            aBest : matchUp.aBest,
            bBest : matchUp.bBest,
          }
        ]

    }
    return(
    <div>
      <Row>
        <Col md={{ size: 3, offset: 2 }}>
          <FormGroup>
          <Input type="select" name="select" id="exampleSelect" onChange={this.onChangeA}>
            <option></option>
            {playerOptions}
          </Input>
          </FormGroup>
        </Col>
        <Col md={{ size: 3, offset: 2 }}>
          <Input type="select" name="select" id="exampleSelect" onChange={this.onChangeB}>
            <option></option>
            {playerOptions}
          </Input>
        </Col>
      </Row>
        {(this.props.playerA && this.props.playerB) && <div>
          <p>{this.props.playerA} vs {this.props.playerB}</p>
          <ReactTable showPagination={false}
          data={data}
          showPageSizeOptions={false}
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
                  Header: this.props.playerA + ' Won',
                  accessor: 'a',
                },
                {
                  Header: this.props.playerB + ' Won',
                  accessor: 'b',
                },
                {
                  Header: ' Draw',
                  accessor: 'draw',
                },
                {
                  Header: this.props.playerA + ' Most Wins',
                  accessor: 'aBest',
                },
                {
                  Header: this.props.playerB + ' Most Wins',
                  accessor: 'bBest',
                }
              ]
              }]}
              />
          </div>}
</div>
)
}
}

function mapStateToProps(store){
  return {
    games : store.mysql.games,
    playerA : store.player.compareA,
    playerB : store.player.compareB,
    names : store.player.names,

  };
}

export default connect(mapStateToProps)(PlayerVPlayer)
