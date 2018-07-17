import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import style from './UsersAll.scss';

class UsersAll extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      authorize: false
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
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

  deleteUser(id) {
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      }
    })
    .then(response => {
      if (response.status === 200) {
        const filteredUsers = this.state.users.filter(user => user._id !== id);
        this.setState({users: filteredUsers});
      } 

      this.setState({authorize: true})
      setTimeout(() => {
        this.setState({authorize: false})
      }, 2500)
    })
    .catch(e => console.log(e));

  }

  render() {
    return (
      <div className='users'>
        <h2 className='users__title'>Users List</h2>

        <ul className='users__list'>
          <li className='users__user'>
            <div className='users__user-cell'>User name</div>
            <div className='users__user-cell'>Created at</div>
            <div className='users__user-cell'>Last login</div>
            <div className='users__user-cell'>User ID</div>
            <div className='users__user-cell'>Delete user</div>
          </li>

          {this.state.users.map((user, index) => (
          <li className='users__user' key={index}>
              <div className='users__user-cell' >{user.name}</div>
              <div className='users__user-cell' >{user.createdAt}</div>
              <div className='users__user-cell' >{user.lastLogin}</div>
              <div className='users__user-cell' >{user._id}</div>
              <div className='users__user-cell' ><button onClick={() => this.deleteUser(user._id)}><i className="fas fa-times"></i></button></div>
            </li>
            )
          )}
        </ul>

        <div className={this.state.authorize ? 'alertBox' : 'hidden'}>
          <h2>Unauthorize</h2>
        </div>

        <NavLink to='/cameras' className='form__body-btn btn users-btn' >Go to store</NavLink>
      </div>
    )
  }
}

export default UsersAll;