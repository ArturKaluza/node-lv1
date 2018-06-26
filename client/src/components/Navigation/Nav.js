import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.scss'; 

const Navigation = () => (
  <nav>
    <div className="nav">
      <h2 className='nav__heading'>Main Menu</h2>
        <ul className='nav__list'>
          <NavLink to="/" className="nav__list-item" activeClassName="is-active" exact={true}>Home</NavLink>
          <NavLink to="/cameras" className="nav__list-item" activeClassName="is-active">Cameras</NavLink>
          <NavLink to="/tv" className="nav__list-item" activeClassName="is-active">TVs</NavLink>
          <NavLink to="/phones" className="nav__list-item" activeClassName="is-active">Phones</NavLink>
        </ul>
    </div>
  </nav>
)

export default Navigation;
