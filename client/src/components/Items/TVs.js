import React, { Component } from 'react';
import style from './Items.scss';

import SearchBar from '../SearchBar/SearchBar';
import Item from '../Item/Item';
import Navigation from '../Navigation/Nav';

class TVs extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.paginationNext = this.paginationNext.bind(this);
    this.paginationPrevius = this.paginationPrevius.bind(this);

    this.state = {
      tvs: [],
      inputVal: '',
      currentPage: 1,
      pages: null,
    }
  }
  
  handleInputChange(e) {
    console.log(e.target.value);
  } 
  
  // fetch data from DB
  componentDidMount() {
    fetch('http://localhost:3000/product/tv?page=1&limit=4')
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

  paginationPrevius() {
    const previusPage = this.state.currentPage -1;

    fetch(`http://localhost:3000/product/tv?page=${previusPage}&limit=4`)
      .then(res => res.json())
      .then(data => this.setState({
          tvs: data.docs,
          currentPage: data.page,
          pages: data.pages}))
      .catch(e => console.log(e))
  }

  paginationNext() {
    const nextPage = this.state.currentPage +1;
    
    fetch(`http://localhost:3000/product/tv?page=${nextPage}&limit=4`)
      .then(res => res.json())
      .then(data => this.setState({
          tvs: data.docs,
          currentPage: data.page,
          pages: data.pages}))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <div className='layout'>
        <Navigation />
        
        <div className='items'>
          <SearchBar onSearch={this.handleInputChange}/>
          <h3 className='items__title'>TVs</h3>
          
          <ul>
            {this.state.tvs.map((tv, index) => 
            <Item 
              key={index}
              name={tv.name} 
              amount={tv.amount}
              desc={tv.desc}
              price={tv.price}

            />)}
          </ul>
          <div className='items__btn'>
          {(this.state.currentPage > 1) && (this.state.currentPage <= this.state.pages) && <button className='items__btn-prev btn' onClick={this.paginationPrevius} >Previus</button>}
          {(this.state.pages && !(this.state.currentPage === this.state.pages) ) && <button className='items__btn-next btn' onClick={this.paginationNext} >Next</button>}
          </div>
        </div>
      </div>
    )
  }
}

export default TVs;