import React, {Component} from 'react';

import SearchBar from '../SearchBar/SearchBar';
import Navigation from '../Navigation/Nav';
import List from '../List/List';

class Products extends Component {
  constructor(){
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.state = {
      items: [],
      foundItems: []
    }
  }
  
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://localhost:3000/product/')
     .then(res => res.json())
     .then(data => this.setState({items: data}))
     .catch(e => console.log(e));
  }


  handleInputChange(e) {
    e.preventDefault();
    const flag = e.target.value.trim() ? true : false; 

    if (e.target.value.trim().length > 3) {
      fetch(`http://localhost:3000/search/${e.target.value}`)
      .then(res => res.json())
      .then(data => {
        if (data[0] && flag) {
          return this.setState({foundItems: data})
        } else {
          this.setState({foundItems: []}, () => this.fetchData())
        }       
      });
    }
   
  } 

  render() {
    return (
      <div className='layout'>
        <Navigation />
        
        <div className='items'>
          <SearchBar onSearch={this.handleInputChange}/>
          <h3 className='items__title'>Products</h3>
          {this.state.foundItems[0] ? <List list={this.state.foundItems.map(item => item._source)} />  : <List list={this.state.items} /> }
        </div>
      </div>
    )}
}

export default Products;