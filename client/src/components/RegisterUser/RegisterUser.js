import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import style from './RegisterUser.scss';

class RegisterUser extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      password1: '',
      password2: '',

      alert: 'hidden',
      alertValue: '',
      boxClass: '',

      success: 'hidden',
      redirect: false
      
    }

    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.checkingPasswords = this.checkingPasswords.bind(this);
  }

  createUser(e) {
    e.preventDefault();
    this.checkingPasswords();

    const body = {
      name: this.state.name,
      password1: this.state.password1,
      password2: this.state.password2
    }
    
    // fetch POST request 
    fetch(`http://localhost:3000/users/create`, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body)
    })
    .then(response => {
      // checking response status
      if (response.status === 201) {
        this.setState({alertValue: 'Success, please login', boxClass: 'form__body-message', alert: 'show'})
        
        setTimeout(() => {
          this.setState({alert: 'hidden', redirect: true})
        }, 3000)
      } else {
        this.setState({alertValue: 'User alredy exsist', boxClass: 'form__body-error', alert: 'show'});
        setTimeout(() => {
          this.setState({alert: 'hidden'})
        }, 3000)
      }
    })
    .catch(e => console.log(e));
   
    this.setState({name:'', password1: '', password2: ''});
  }

  checkingPasswords() {
    if (this.state.password1 !== this.state.password2) {
      this.setState({
        alertValue: 'Passwords not the same',
        alert: 'show',
        boxClass: 'form__body-error'
    })
      setTimeout(() => {
        this.setState({alert: 'hidden'})
      }, 3000)
    }

    if (this.state.password1.length < 6) {
        this.setState({
          alertValue: 'Min 6 char require',
          alert: 'show',
          boxClass: 'form__body-error'
        });
        setTimeout(() => {
          this.setState({alert: 'hidden'})
        }, 3000);
    }
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="form">
      <NavLink to="/" exact className='form__closeBtn'>X</NavLink>
      <div className="form__heading">
        <h2 className="form__heading-title">Register new User</h2>
      </div>

      <div className="form__body">
        <form className="form__body-form" onSubmit={this.createUser} >

          <div className="form__body-group">
            <label htmlFor="Username" className="form__body-group-label">User Name</label>
            <input type="text" placeholder="Name" name="name" className="form__body-group-input" required="true" onChange={this.handleChange} value={this.state.name} />
          </div>

           <div className="form__body-group">
            <label htmlFor="password" className="form__body-group-label" >Password</label>
            <input type="password" placeholder="******" name="password1" className="form__body-group-input" required="true" onChange={this.handleChange} value={this.state.password1} />
          </div>

           <div className="form__body-group">
            <label htmlFor="password2" className="form__body-group-label">Password</label>
            <input type="password" placeholder="******" name="password2" className="form__body-group-input" required="true" onChange={this.handleChange} value={this.state.password2} />
            
          </div>

          <div className={this.state.alert}>
               <h2 className={this.state.boxClass}>{this.state.alertValue}</h2>
           </div>         

          {this.state.redirect ? <Redirect to='/user/login' /> : false }    

          <button type="submit" className="form__body-btn btn">Submit</button>
          
        </form>

      </div>
    </div>
    )
  }
}

export default RegisterUser;