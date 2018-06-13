import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import AddGame from './js/AddGame.jsx'
import './App.css';
import { Button } from 'reactstrap';
import {  Container, Row, Col} from 'reactstrap';
import ResultsTab from './js/ResultsTabs.jsx'
import { Provider } from "react-redux";
import store from "./js/store/store.js";
import { sendGame, getMostRecent } from "./js/store/mysqlActions.js"
import { connect } from 'react-redux'
import AddTeam from './js/AddTeam'
import { addTeam } from './js/store/teamActions.js'
<<<<<<< HEAD
import {reset} from 'redux-form';
=======
import { reset } from 'redux-form'
>>>>>>> 34786c67538ac535d79fbaefda7d25e73d473491

class App extends Component {
  handleSubmit(values) {
    store.dispatch(sendGame(values));
<<<<<<< HEAD
    store.dispatch(reset('addGame'))
}
teamSubmit(values) {
  store.dispatch(addTeam(values.team));
  store.dispatch(reset('addTeam'))

=======
    store.dispatch(reset('addGame'));
}
teamSubmit(values) {
  store.dispatch(addTeam(values.team));
  store.dispatch(reset('addTeam'));
>>>>>>> 34786c67538ac535d79fbaefda7d25e73d473491
}
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">This FIFA shit just got real</h1>
          </header>

          <p className="App-intro">
            No more Sheets shit
          </p>
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <AddGame onSubmit={this.handleSubmit}/>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={{ size: 8, offset: 2 }}>
            <AddTeam onSubmit={this.teamSubmit} />
            </Col>
            </Row>
          </Container>
          <br />
          <ResultsTab />
        </div>
    );
  }
}

function mapStateToProps(state){
  return {
  };
};

export default connect(mapStateToProps)(App)
