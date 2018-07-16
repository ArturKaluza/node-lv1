import React, { Component } from 'react';
import style from './Items.scss';
import { NavLink } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import Navigation from '../Navigation/Nav';
import List from '../List/List';

class TVs extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.paginationNext = this.paginationNext.bind(this);
    this.paginationPrevius = this.paginationPrevius.bind(this);
    this.handleItemPerPage = this.handleItemPerPage.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
   
    this.state = {
      tvs: [],
      inputVal: '',
      currentPage: 1,
      pages: null,
      itemPerPage: 4,
      foundItems: [],
      auth: false
    }
  }
  
  handleInputChange(e) {
    e.preventDefault();
    const flag = e.target.value.trim() ? true : false; 
    
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
  
  // fetch data from DB
  componentDidMount() {
    this.fetchData();
    this.checkAuth();
  }

  fetchData() {
    fetch(`http://localhost:3000/product/tv?page=1&limit=${this.state.itemPerPage}`)
     .then(res => res.json())
     .then(data => {
        this.setState({
        tvs: data.docs,
        currentPage: data.page,
        pages: data.pages
      })
    })
     .catch(e => console.log(e));
  }

  checkAuth() {
    const token = sessionStorage.getItem('token')
    token !== null ? this.setState({auth: true}) : this.setState({auth: false});
  }

  handleDeleteItem(id) {
    fetch(`http://localhost:3000/product/camera/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      }
    })
    .then(res => {
      if (res.status === 200) {
        const filteredState = this.state.phones.filter(item => item._id !== id);
        this.setState({phones: filteredState});
      }
    });
  }

  paginationPrevius() {
    const previusPage = this.state.currentPage -1;

    fetch(`http://localhost:3000/product/tv?page=${previusPage}&limit=${this.state.itemPerPage}`)
      .then(res => res.json())
      .then(data => this.setState({
          tvs: data.docs,
          currentPage: data.page,
          pages: data.pages}))
      .catch(e => console.log(e))
  }

  paginationNext() {
    const nextPage = this.state.currentPage +1;
    
    fetch(`http://localhost:3000/product/tv?page=${nextPage}&limit=${this.state.itemPerPage}`)
      .then(res => res.json())
      .then(data => this.setState({
          tvs: data.docs,
          currentPage: data.page,
          pages: data.pages}))
      .catch(e => console.log(e))
  }

  handleItemPerPage(value) {
    // execution fetchData after setState is complete
    this.setState({itemPerPage: value}, () => this.fetchData());
  }

  handleLogout() {
    sessionStorage.removeItem('token');
    this.setState({auth: false});    
  }

  render() {
    return (
      <div className='layout'>
        <Navigation onItemPerPage={this.handleItemPerPage}/>
        
        <div className='items'>
          <SearchBar onSearch={this.handleInputChange}/>
          
          <div className="heading">
            <h3 className='items__title'>TVs</h3>
            <div className='items__btns'>
            {!!sessionStorage.getItem('token') && <NavLink to="/cameras/new" className="heading__btns-new btn">add new item</NavLink>}
              
              <NavLink to="user/register" className="heading__btns-new btn">Register user</NavLink>
            </div>            
          </div>
          
          {/* {Render list} */}
            {this.state.foundItems[0] ? <List list={this.state.foundItems.map(item => item._source)} />  : <List list={this.state.tvs} deleteItem={this.handleDeleteItem } /> }
          

          <div className='items__btn'>
          {!this.state.foundItems.length && ((this.state.currentPage > 1) && (this.state.currentPage <= this.state.pages) && <button className='items__btn-prev btn' onClick={this.paginationPrevius} >Previus</button>)}
          {!this.state.foundItems.length && ((this.state.pages && !(this.state.currentPage === this.state.pages) ) && <button className='items__btn-next btn' onClick={this.paginationNext} >Next</button>)}
          </div>
        </div>
      </div>
    )
  }
}

export default TVs;