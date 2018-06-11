import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { Field } from 'redux-form';

export default class ScoreInput extends Component {
  render() {
    const {
      input,
      inputId,
      type,
      formLabel,
    } = this.props;

    return (
    <div>
      <FormGroup>
        <Label for={inputId}>{formLabel}</Label>
        <Input {...input} type="number" id={inputId} name="select"/>
      </FormGroup>
      </div>)
}
}
