import React, {Component} from 'react';

import Navigation from '../Navigation/Nav';
import SearchBar from '../SearchBar/SearchBar';
import Camera from '../Camera/Camera';

class Products extends Component {
  constructor(){
    super();

    this.state = {
      items: []
    }
  }
  
  componentDidMount() {
    fetch('http://localhost:3000/product/')
     .then(res => res.json())
     .then(data => this.setState({items: data}))
     .catch(e => console.log(e));
  }

  render() {
    return (
      <div className='layout'>
        <Navigation />
        
        <div className='cameras'>
          <SearchBar onSearch={this.handleInputChange}/>
          <h3 className='cameras__title'>Products</h3>
          <ul>
            {this.state.items.map((camera, index) => 
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
    )}
}

export default Products;