import React, { Component } from 'react';
import style from './Cameras.scss';

import SearchBar from '../SearchBar/SearchBar';
import Camera from '../Camera/Camera';

class Cameras extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      cameras: [
        // {name: 'item1', amount: '20', desc: 'amazing item 1', price: 19.99}, 
        // {name: 'item100', amount: '520', desc: 'amazing item 100', price: 219.99},
        // {name: 'item100', amount: '520', desc: 'amazing item 100', price: 219.99}
      ],
      inputVal: ''
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
     .then(data => this.setState({cameras: data.docs}))
     .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleInputChange}/>
        <div className='cameras'>
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
        </div>
      </div>
    )
  }
}

export default Cameras;