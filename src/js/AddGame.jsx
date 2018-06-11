
import React, { Component } from 'react';
import {  Row, Col, Button, } from 'reactstrap';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import { getTeams } from './store/teamActions'
import store from './store/store'


import PlayerSelect from './PlayerSelect.jsx'
import TeamSelect from './TeamSelect.jsx'
import ScoreInput from './scoreInput.jsx'

const required = value => (value ? undefined : 'Required')
class AddGameForm extends Component {
  componentDidMount() {
    store.dispatch(getTeams())
  }
  render() {
    const teams = this.props.teams.map(team => (
      Object.assign({}, {value: team.name}, {label: team.name})))
    console.log(teams)
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} id="addGame">
        <div>
          <Row>
            <Col xs="6">
              <Field name="home"
                validate={required}
                component={PlayerSelect} inputId="home" formLabel="Home Player"/>
            </Col>
            <Col xs="6">
              <Field name="away"
                validate={required}
                component={PlayerSelect} inputId="away" formLabel="Away Player"/>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <Field
                validate={required}
                name="homeTeam"
                component={props =>
                  <TeamSelect
                    {...props}
                    options={teams}/>}
                   />
                </Col>
             <Col xs="6">
            <Field
              validate={required}
              name="awayTeam"
              component={props =>
                <TeamSelect
                  {...props}
                  options={teams}/>}
                />
             </Col>
          </Row>
        </div>
        <Row>
          <Col md={{ size: 3, offset: 3 }}>
            <Field name="homeScore" component={ScoreInput} inputId="homeScore"
              validate={required}
              formLabel=""/>
          </Col>
          <Col md={{ size: 3, offset: 0 }}>
            <Field name="awayScore" component={ScoreInput} inputId="awayScore"
              validate={required}
              formLabel=""/>
          </Col>
        </Row>
        <br />
        <Button type="submit">
          Submit
        </Button>
      </form>
    )
  }
}


const Form = reduxForm({
  form: 'addGame',
})(AddGameForm);


function mapStateToProps(store){
  return {
    teams: store.team.teams
  };
}
export default connect(mapStateToProps)(Form)
