import React from 'react';
import { connect } from 'react-redux'
import { getStats } from './store/mysqlActions.js'
import store from './store/store.js'
import ReactTable from 'react-table';

class Rankings extends React.Component{
  componentDidMount() {
    store.dispatch(getStats())
  }

  render() {
    return (
      <ReactTable
        data={this.props.stats}
        showPagination={false}
        showPageSizeOptions={false}
        columns={[
          {
            columns: [
              {
                Header: "Player",
                accessor: "player"
              },
              {
                Header: "Games",
                accessor: "games",
              },
              {
                Header: "Wins",
                accessor: "wins",
              },
              {
                Header: "Losses",
                accessor: "losses",
              },
              {
                Header: "Draws",
                accessor: "draws",
              },
              {
                Header: "Goals For",
                accessor: "gf",
              },
              {
                Header: "Goals Against",
                accessor: "ga",
              },
              {
                Header: "Points",
                accessor: "points",
              },
              {
                Header: "Elo",
                accessor: 'elo'
              }
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
    stats: store.mysql.stats
  };
}

export default connect(mapStateToProps)(Rankings)
