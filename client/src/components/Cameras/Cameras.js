import React, { Component } from 'react';
import style from './Cameras.scss';

import SearchBar from '../SearchBar/SearchBar';
import Camera from '../Camera/Camera';

class Cameras extends Component {
  constructor() {
    super();
    this.state = {
      cameras: [{name: 'item1', amount: '20', desc: 'amazing item 1', price: 19.99}]
    }
  }

  render() {
    return (
      <div>
        <SearchBar />
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