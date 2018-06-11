import React, { Component } from 'react';

export default class Posts extends Component {
  constructor(){
      super();
      this.state =
      {
        match : ''
      };
    }

    componentDidMount() {
        fetch('http://localhost:3001/fifa')
        .then(results => results.json())
        .then(data =>
          {this.setState({
            match : data
          })})
    }


  render() {
    var test = '';
    if (this.state.match[0]) {
      console.log(this.state.match[0].home)
      test = this.state.match[0].home
    }
    return (
      <p>{test}</p>
  );
  }
}
