import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Router from '../router/Router';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Router />
      </div>
    )
  }
}

export default App;