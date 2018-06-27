import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Home.scss';

const Home = () => (
  <div className="home">
    <div className="home__heading">
      <h1 className="home__heading-primary">Online Store</h1>
      <h2 className="home__heading-secondary">Find something for you</h2>
    </div>
    <NavLink to="/cameras" className="home__btn">See Offer</NavLink>
  </div>
)

export default Home;