import React, { Component } from 'react';
import {  Row, Col, Button, } from 'reactstrap';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'

const required = value => (value ? undefined : 'Required')
class AddTeamForm extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} id="addTeam">
        <Row>
          <Col>
            <div>
              <Field name="team"
                component="input"
                validate={required}
                type='text'/>
            </div>
          </Col>
          <Col>
            <Button size='sm' type="submit">
              Add New Team
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}


const Form = reduxForm({
  form: 'addTeam',
})(AddTeamForm);


function mapStateToProps(store){
  return {
  };
}
export default connect(mapStateToProps)(Form)
