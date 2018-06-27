import React, { Component } from 'react';
import style from './Cameras.scss';

import SearchBar from '../SearchBar/SearchBar';
import Camera from '../Camera/Camera';
import Navigation from '../Navigation/Nav';

class Cameras extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.paginationNext = this.paginationNext.bind(this);
    this.state = {
      cameras: [
        // {name: 'item1', amount: '20', desc: 'amazing item 1', price: 19.99}, 
        // {name: 'item100', amount: '520', desc: 'amazing item 100', price: 219.99},
        // {name: 'item100', amount: '520', desc: 'amazing item 100', price: 219.99}
      ],
      inputVal: '',
      currentPage: 1,
      pages: null
    }
  }
  
  handleInputChange(e) {
    console.log('e.target:', e.target.value);
    this.setState({inputVal: e.target.value});
    console.log('value:', this.state.inputVal);
  }

  // fetch data from DB
  componentDidMount() {
    fetch('http://localhost:3000/product/camera?page=1&limit=4')
     .then(res => res.json())
     .then(data => {
      this.setState({
        cameras: data.docs,
        currentPage: data.page,
        pages: data.pages
      })
      console.log(this.state.pages);
    })
     .catch(e => console.log(e));
  }

  paginationNext() {
    const nextPage = this.state.currentPage +1;
    
    fetch(`http://localhost:3000/product/camera?page=${nextPage}&limit=4`)
      .then(res => res.json())
      .then(data => this.setState({
          cameras: data.docs,
          currentPage: data.page,
          pages: data.pages}))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <div className='layout'>
        <Navigation />
        
        <div className='cameras'>
          <SearchBar onSearch={this.handleInputChange}/>
          <h3 className='cameras__title'>Cameras</h3>
          <ul>
            {this.state.cameras.map((camera, index) => 
            <Camera 
              key={index}
              name={camera.name} 
              amount={camera.amount}
              desc={camera.desc}
              price={camera.price}

            />)}
          </ul>
          {}
          {(this.state.pages && !(this.state.currentPage === this.state.pages) ) && <button className='next__btn' onClick={this.paginationNext} >Load more...</button>}
        </div>
      </div>
    )
  }
}

export default Cameras;