import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

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
        <Navigation visible={'hidden'}/>
                
        <div className='items'>
          <SearchBar onSearch={this.handleInputChange}/>

           <div className="heading">
            <h3 className='items__title'><span>P</span><span>r</span><span>o</span><span>d</span><span>u</span><span>c</span><span>t</span><span>s</span></h3>
            <div className='items__btns'>
              {!!sessionStorage.getItem('token') && <NavLink to="/cameras/new" className="heading__btns-new btn">add new item</NavLink>}
              {!!sessionStorage.getItem('token') && <NavLink to="/user/all" className="heading__btns-new btn">See all users</NavLink>}
              <NavLink to="user/register" className="heading__btns-new btn">Register user</NavLink>
            </div>            
          </div>
          
          {this.state.foundItems[0] ? <List list={this.state.foundItems.map(item => item._source)} />  : <List list={this.state.items} /> }
        </div>
      </div>
    )}
}

export default Products;