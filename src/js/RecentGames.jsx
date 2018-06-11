import ReactTable from 'react-table';
import store from './store/store.js'
import { getMostRecent } from './store/mysqlActions.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'


class RecentGames extends Component {
  componentDidMount() {
    store.dispatch(getMostRecent(10));
  }

render() {
  return(
    <ReactTable
      data={this.props.recent.reverse()}
      showPagination={false}
      showPageSizeOptions={false}
      columns={[
        {
          columns: [
            {
              Header: "Home Player",
              accessor: "home"
            },
            {
              Header: "Home Team",
              accessor: "homeTeam",
            }
          ]
        },
        {
          columns: [
            {
              Header: "Away Player",
              accessor: "away"
            },
            {
              Header: "Away Team",
              accessor: "awayTeam"
            }
          ]
        },
        {
          columns: [
            {
              Header: "Home Score",
              accessor: "homeScore"
            }, {
              Header: "Away Score",
              accessor: "awayScore"
            }
          ]
        }
      ]}
      defaultPageSize={10}
      className="-striped -highlight"
      />
    )
  }
}


function mapStateToProps(state){
  return {
      recent : state.mysql.recent,
    };
  };

export default connect(mapStateToProps)(RecentGames)
