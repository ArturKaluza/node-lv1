import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import style from './LoginUser.scss';
import { rejects } from 'assert';

class LoginUser extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      password: '',
      auth: false,
      error: false,
      redirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  checkForm() {
    if (this.state.name.lenght < 3) {
      this.setState({name: 'min 3 char require'});
    }

    if (this.state.password.length < 6) { 
      this.setState({password: 'min 6 char require'});
    }
  }

  handleLoginUser(e) {
    e.preventDefault();
    this.checkForm();

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
    .then(response =>{
      if (response.status === 404) {
        this.setState({auth: false, redirect: false , error: true});
        setTimeout(() => this.setState({error: false}), 3000);
        return;
      } else {
        return response.json();
      }
     })
    .then(resjson => {
      sessionStorage.setItem('token', `bearer ${resjson.token}`)
      this.setState({
        auth: true,
        name: '',
        password: ''
      });
      // hide message box 
      setTimeout(() => this.setState({auth: false, redirect: true}), 2000);
    })
    .catch(e => console.log(e))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className='bodyForm'>
        <div className="formLogin">
        <NavLink to="/cameras" exact className='form__closeBtn'>X</NavLink>
        <div className="form__heading">
          <h2 className="form__heading-title login">Login</h2>
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

           <div className={this.state.auth ? 'show' : 'hidden'}>
                <h2 className='form__body-message'>Login Success</h2>
            </div>   

            <div className={this.state.error ? 'show' : 'hidden'}>
                <h2 className='width-error'>User and password don't match</h2>
            </div>       
          
            { this.state.auth ? <NavLink to='/cameras' className="form__body-btn btn mt20">Store</NavLink> : <button type="submit" className="form__body-btn btn mt20">Submit</button> }
            { this.state.redirect ? <Redirect to='/cameras' /> : false }
            
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