import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class UsersAll extends Component {
  constructor() {
    super();

    this.state = {
      users: []
    }

    this.fetchUsers = this.fetchUsers.bind(this);
  }  

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('http://localhost:3000/users')
      .then(data => data.json())
      .then(res => this.setState({users: res}))
      .catch(e => console.log(e)); 
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        <ul>
          {this.state.users.map((user, index) => <div key={index}>{user.name}</div>)}
        </ul>
        <NavLink to='/cameras'>Go to store</NavLink>
      </div>
    )
  }
}

export default UsersAll;