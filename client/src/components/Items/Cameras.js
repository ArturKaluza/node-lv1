import React, { Component } from 'react';
import style from './Items.scss';

import SearchBar from '../SearchBar/SearchBar';
import Navigation from '../Navigation/Nav';
import List from '../List/List';

class Cameras extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.paginationNext = this.paginationNext.bind(this);
    this.paginationPrevius = this.paginationPrevius.bind(this);
    this.handleItemPerPage = this.handleItemPerPage.bind(this);
    this.fetchData = this.fetchData.bind(this);
   
    this.state = {
      cameras: [],
      inputVal: '',
      currentPage: 1,
      pages: null,
      itemPerPage: 4,
      foundItems: []
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
  }

  fetchData() {
    fetch(`http://localhost:3000/product/camera?page=1&limit=${this.state.itemPerPage}`)
     .then(res => res.json())
     .then(data => {
        this.setState({
        cameras: data.docs,
        currentPage: data.page,
        pages: data.pages
      })
    })
     .catch(e => console.log(e));
  }

  paginationPrevius() {
    const previusPage = this.state.currentPage -1;

    fetch(`http://localhost:3000/product/camera?page=${previusPage}&limit=${this.state.itemPerPage}`)
      .then(res => res.json())
      .then(data => this.setState({
          cameras: data.docs,
          currentPage: data.page,
          pages: data.pages}))
      .catch(e => console.log(e))
  }

  paginationNext() {
    const nextPage = this.state.currentPage +1;
    
    fetch(`http://localhost:3000/product/camera?page=${nextPage}&limit=${this.state.itemPerPage}`)
      .then(res => res.json())
      .then(data => this.setState({
          cameras: data.docs,
          currentPage: data.page,
          pages: data.pages}))
      .catch(e => console.log(e))
  }

  handleItemPerPage(value) {
    // execution fetchData after setState is complete
    this.setState({itemPerPage: value}, () => this.fetchData());
  }

  render() {
    return (
      <div className='layout'>
        <Navigation onItemPerPage={this.handleItemPerPage}/>
        
        <div className='items'>
          <SearchBar onSearch={this.handleInputChange}/>
          <h3 className='items__title'>Cameras</h3>
          
          {/* {Render list} */}
            {this.state.foundItems[0] ? <List list={this.state.foundItems.map(item => item._source)} />  : <List list={this.state.cameras} /> }
          

          <div className='items__btn'>
          {!this.state.foundItems.length && ((this.state.currentPage > 1) && (this.state.currentPage <= this.state.pages) && <button className='items__btn-prev btn' onClick={this.paginationPrevius} >Previus</button>)}
          {!this.state.foundItems.length && ((this.state.pages && !(this.state.currentPage === this.state.pages) ) && <button className='items__btn-next btn' onClick={this.paginationNext} >Next</button>)}
          </div>
        </div>
      </div>
    )
  }
}

export default Cameras;