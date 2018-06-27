import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NotFound.scss';

const NotFound = () => {
  return (
  <div className='not'>
    <div className='not__element'>
      <h2 className='not__element-heading'>Sorry, page not found</h2>
      <NavLink to="/" className="not__element-btn" exact={true}>Home</NavLink>
    </div>
  </div>
  )
}

export default NotFound;