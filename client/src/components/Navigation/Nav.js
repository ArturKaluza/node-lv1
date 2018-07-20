import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.scss'; 

const Navigation = (props) => (
  <nav>
    <div className="nav">
          
      <h2 className='nav__heading'>Products</h2>
      <ul className='nav__list'>
        <NavLink to="/cameras" className="nav__list-item" activeClassName="is-active">Cameras<i class="fas fa-camera"></i></NavLink>
        <NavLink to="/tv" className="nav__list-item" activeClassName="is-active">TVs<i class="fas fa-tv"></i></NavLink>
        <NavLink to="/phones" className="nav__list-item" activeClassName="is-active">Phones<i class="fas fa-mobile-alt"></i></NavLink>
        {/* <NavLink to="/tam" className="nav__list-item" activeClassName="is-active">Not Found</NavLink> */}
        <NavLink to="/product" className="nav__list-prod" activeClassName="is-active">All<i class="fas fa-globe"></i></NavLink>
      </ul>
      
      <div className={props.visible}>
        <h2 className='nav__heading'>Item per page</h2>
        <ul className='nav__list'>
          <li className='nav__list-item' onClick={() => props.onItemPerPage(4)}>4</li>
          <li className='nav__list-item' onClick={() => props.onItemPerPage(5)}>5</li>
          <li className='nav__list-item' onClick={() => props.onItemPerPage(7)}>7</li>
          <li className='nav__list-item' onClick={() => props.onItemPerPage(10)}>10</li>
        </ul>
      </div>

      <div className='nav__btns'>
        {!!sessionStorage.getItem('token') ? <button className="nav__btns-login logout" onClick={props.logout}>Log-out</button> : <NavLink to='/user/login' className="nav__btns-login">Log-in</NavLink>}
        
      </div>

    </div>
  </nav>
)

export default Navigation;
