import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import style from './LoginUser.scss';

class LoginUser extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      password: '',
      auth: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
  }

  handleLoginUser(e) {
    e.preventDefault();

    const body = {
      name: this.state.name,
      password: this.state.password
    }

    fetch(`http://localhost:3000/auth/login`, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(resjson => {
      sessionStorage.setItem('token', `bearer ${resjson.token}`)
      this.setState({auth: true});
    })
    .catch(e => console.log(e))
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.password);
  }

  render() {
    return (
      <div className='bodyForm'>
        <div className="formLogin">
        <NavLink to="/" exact className='form__closeBtn'>X</NavLink>
        <div className="form__heading">
          <h2 className="form__heading-title login">Register new User</h2>
        </div>

        <div className="form__body">
          <form className="form__body-form" onSubmit={this.handleLoginUser} >

            <div className="form__body-group">
              <label htmlFor="Username" className="form__body-group-label">User Name</label>
              <input type="text" placeholder="Name" name="name" className="form__body-group-input" required="true" onChange={this.handleChange} value={this.state.name} />
            </div>

            <div className="form__body-group">
              <label htmlFor="password" className="form__body-group-label" >Password</label>
              <input type="password" placeholder="******" name="password" className="form__body-group-input" required="true" onChange={this.handleChange} value={this.state.password} />
            </div>

          {/* { <div className={this.state.alert}>
                <h2 className={this.state.boxClass}>{this.state.alertValue}</h2>
      </div> }          */}
          
            { this.state.auth ? <NavLink to='/cameras' className="form__body-btn btn mt20">Store</NavLink> : <button type="submit" className="form__body-btn btn mt20">Submit</button> }
            
            
          </form>

          <h2 className='form__heading-title slogan'>Need Account?</h2>
          <NavLink to='/user/register' className="form__body-btn btn">Register User</NavLink>          

        </div>
      </div>
    </div>
    )
  }
}

export default LoginUser;