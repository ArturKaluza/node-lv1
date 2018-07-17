import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import style from './Router.scss';

import Home from '../components/Home/Home';
import Cameras from '../components/Items/Cameras';
import Phones from '../components/Items/Phons';
import TVs from '../components/Items/TVs';
import NotFound from '../components/NotFound/NotFound';
import Products from '../components/Products/Products';
import NewItem from '../components/NewItem/NewItem';
import RegisterUser from '../components/RegisterUser/RegisterUser';
import LoginUser from '../components/LoginUser/LoginUser';
import UsersAll from '../components/UsersAll/UsersAll';

const AppRouter = () => (
    <BrowserRouter>
      <div className="app">
        <div className='content'>
          <Switch>
            {/* <Route path="/" component={UsersAll} exact /> */}
            <Route path="/" component={Home} exact />
            <Route path="/cameras/new" component={NewItem} />
            <Route path="/cameras" component={Cameras} />
            <Route path="/TV" component={TVs} />
            <Route path="/phones" component={Phones} />
            <Route path="/product" component={Products} />

            <Route path='/user/login' component={LoginUser} />
            <Route path="/user/register" component={RegisterUser} />
            <Route path="/user/all" component={UsersAll} />

            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
  
  export default AppRouter;