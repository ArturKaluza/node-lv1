import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class LoginBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavLink to='/'>Log in</NavLink>
        <NavLink to='/'>Sing in</NavLink>
      </div>
    )
  }
}

export default LoginBar;