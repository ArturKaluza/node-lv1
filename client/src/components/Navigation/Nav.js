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
        <NavLink to="/tam" className="nav__list-item" activeClassName="is-active">Not Found</NavLink>
        <NavLink to="/product" className="nav__list-prod" activeClassName="is-active">See all products</NavLink>
      </ul>
      <h2 className='nav__heading'>Item per page</h2>
      <ul className='nav__list'>
        <li className='nav__list-item'>3</li>
        <li className='nav__list-item'>5</li>
        <li className='nav__list-item'>7</li>
        <li className='nav__list-item'>10</li>
        
      </ul>
    </div>
  </nav>
)

export default Navigation;
