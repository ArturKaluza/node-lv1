import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import style from './NewItem.scss';

class NewItem extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      price: '',
      amount: '',
      desc: '',

      message: 'hidden',
      error: 'hidden',

      displayName: 'hidden',
      displayPrice: 'hidden',
      dispalyAmount: 'hidden',
      disaplyDesc: 'hidden',
      displayType: 'hidden'
    }

    this.handleForm = this.handleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleForm(e) {
    e.preventDefault();
    const type = e.target.type.value
    
    if (!type) {
      this.setState({displayType: 'display'});
      setTimeout(() => {
        this.setState({displayType: 'hidden'})
      }, 3000)
    }

    if (this.state.price <= 0) {
      this.setState({displayPrice: 'display'});
      setTimeout(() => {
        this.setState({displayPrice: 'hidden'})
      }, 3000)
    }

    if (this.state.amount <= 0) {
      this.setState({displayAmount: 'display'});
      setTimeout(() => {
        this.setState({displayAmount: 'hidden'})
      }, 3000)
    }
    
    if (!this.state.name.trim()) {
      this.setState({displayName: 'display'});
      setTimeout(() => {
        this.setState({displayName: 'hidden'})
      }, 3000)
    }

    if (!this.state.desc.trim()) {
      this.setState({disaplyDesc: 'display'});
      setTimeout(() => {
        this.setState({disaplyDesc: 'hidden'})
      }, 3000)
    }

    if (this.state.price > 0 && this.state.amount > 0 && this.state.name.trim() && this.state.desc.trim()) {
      
      const body = {
        name: this.state.name,
        desc: this.state.desc,
        amount: this.state.amount,
        price: this.state.price
      }
      
      // fetch POST request 
      fetch(`http://localhost:3000/product/${type}/new`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem('token')
          },
          method: "POST",
          body: JSON.stringify(body)
      })
      .then(response => {
        this.setState({ name: '', desc: '', amount: '', price: ''});
        if (response.status === 201) {
          this.setState({message: 'show'})
          setTimeout(() => {
            this.setState({message: 'hidden'})
          }, 3000)
        } else {
          this.setState({error: 'show'});
          setTimeout(() => {
            this.setState({error: 'hidden'})
          }, 3000);
        };        
      });
    }    
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="form">
        <NavLink to="/cameras" exact className='form__closeBtn'>X</NavLink>
        <div className="form__heading">
          <h2 className="form__heading-title">Add new Item</h2>
        </div>

        <div className="form__body">
          <form className="form__body-form" onSubmit={this.handleForm}  >

            <div className="form__body-group">
              <h3 className="form__body-group-label">Choose type</h3>
              <div className="form__body-group-radio">
                <label><input type="radio" name="type" value="camera"/> Camera</label>
                <label><input type="radio" name="type" value="phone"/> Phone</label>
                <label><input type="radio" name="type" value="tv"/> TV</label>
              </div>
              <h3 className={this.state.displayType}>Choose type</h3>
            </div>

            <div className="form__body-group">
              <label htmlFor="name" className="form__body-group-label">Item's name</label>
              <input type="text" placeholder="Name" name="name" className="form__body-group-input" required="true"  onChange={this.handleChange} value={this.state.name} />
              <h3 className={this.state.displayName}>Name should not be empty</h3>
            </div>

             <div className="form__body-group">
              <label htmlFor="price" className="form__body-group-label" >Item's price</label>
              <input type="number" placeholder="Price" name="price" className="form__body-group-input" required="true" onChange={this.handleChange} value={this.state.price} />
              <h3 className={this.state.displayPrice}>Price is not correct</h3>
            </div>

             <div className="form__body-group">
              <label htmlFor="amount" className="form__body-group-label">Item's amount</label>
              <input type="number" placeholder="Amount" name="amount" className="form__body-group-input" required="true" onChange={this.handleChange} value={this.state.amount} />
              <h3 className={this.state.dispalyAmount}>Amount is not correct</h3>
            </div>

            <div className={this.state.message}>
                <h2 className='form__body-message'>Item Added Success</h2>
            </div>

             <div className={this.state.error}>
                <h2 className='form__body-error'>Error Occur!</h2>
            </div>

             <div className="form__body-group">
              <label htmlFor="desc" className="form__body-group-label" >Item's description</label>
              <textarea type="text" placeholder="Description..." name="desc" className="form__body-group-textarea" required="true" onChange={this.handleChange} value={this.state.desc} />
              <h3 className={this.state.disaplyDesc}>Description empty!</h3>
            </div>

            <button type="submit" className="form__body-btn btn">Create</button>
            
          </form>

        </div>
      </div>
    )
  }

}

export default NewItem;