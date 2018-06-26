import React, { Component } from 'react';
import style from './SearchBar.scss';

class SearchBar extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className='searchBar'>
        <h3 className='searchBar__text'>Online Store</h3>
        <input className='searchBar__input' type='text' placeholder='Search...' />        
      </div>
    )
  }
}


export default SearchBar;