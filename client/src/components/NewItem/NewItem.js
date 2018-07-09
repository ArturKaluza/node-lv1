import React, { Component } from 'react';
import style from './NewItem.scss';

class NewItem extends Component {
  constructor() {
    super()

    this.state = {
      name: 'hidden',
      price: 'hidden',
      amount: 'hidden',
      desc: 'hidden'
    }

    this.handleForm = this.handleForm.bind(this);
  }

  handleForm(e) {
    e.preventDefault();
    
    const name = e.target.name;
    const price = e.target.price;
    const amount = e.target.amount;
    const desc = e.target.desc;

    if (price.value <= 0) {
      this.setState({price: 'display'});
      setTimeout(() => {
        this.setState({price: 'hidden'})
      }, 3000)
      price.value = 0;
    }

    if (amount.value <= 0) {
      this.setState({amount: 'display'});
      setTimeout(() => {
        this.setState({amount: 'hidden'})
      }, 3000)
      amount.value = 0;
    }

    if (!name.value.trim()) {
      this.setState({name: 'display'});
      setTimeout(() => {
        this.setState({name: 'hidden'})
      }, 3000)
    }

    if (!desc.value.trim()) {
      this.setState({desc: 'display'});
      setTimeout(() => {
        this.setState({desc: 'hidden'})
      }, 3000)
    }


    console.log(name, desc, price, amount);
  }

  render() {
    return (
      <div className="form"> 
        <div className="form__heading">
          <h2 className="form__heading-title">Add new Item</h2>
        </div>

        <div className="form__body">
          <form className="form__body-form" onSubmit={this.handleForm}>
            <div className="form__body-group">
              <label htmlFor="name" className="form__body-group-label">Item's name</label>
              <input type="text" placeholder="Name" id="name" className="form__body-group-input" />
              <h3 className={this.state.name}>Name should not be empty</h3>
            </div>

             <div className="form__body-group">
              <label htmlFor="price" className="form__body-group-label" >Item's price</label>
              <input type="number" placeholder="Price" id="price" className="form__body-group-input" />
              <h3 className={this.state.price}>Price is not correct</h3>
            </div>

             <div className="form__body-group">
              <label htmlFor="amount" className="form__body-group-label">Item's amount</label>
              <input type="number" placeholder="Amount" id="amount" className="form__body-group-input" />
              <h3 className={this.state.amount}>Amount is not correct</h3>
            </div>

             <div className="form__body-group">
              <label htmlFor="desc" className="form__body-group-label" >Item's description</label>
              <textarea type="text" placeholder="Description..." id="desc" className="form__body-group-textarea" />
              <h3 className={this.state.desc}>Description empty!</h3>
            </div>

            <button type="submit" className="form__body-btn btn">Create</button>
            
          </form>

        </div>
      </div>
    )
  }

}

export default NewItem;