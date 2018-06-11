import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { Field } from 'redux-form';

export default class PlayerSelect extends Component {
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
        <Input {...input} type="select" id={inputId} name="select">
          <option></option>
          <option>Joe</option>
          <option>Jason</option>
          <option>Jack</option>
          <option>Will</option>
          <option>Other</option>
        </Input>
      </FormGroup>
      </div>)
}
}
