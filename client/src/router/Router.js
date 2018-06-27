import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import style from './Router.scss';

import Navigation from '../components/Navigation/Nav';
import Home from '../components/Home/Home';
import Cameras from '../components/Cameras/Cameras';
import NotFound from '../components/NotFound/NotFound';

const AppRouter = () => (
    <BrowserRouter>
      <div className="app">
        <div className='content'>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/cameras" component={Cameras} />
            <Route path="/TV" component={Cameras} />
            <Route path="/phones" component={Cameras} />
            <Route path='*' exact={true} component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
  
  export default AppRouter;