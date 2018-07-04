import React, { Component } from 'react';
import style from './Items.scss';

import SearchBar from '../SearchBar/SearchBar';
import Item from '../Item/Item';
import Navigation from '../Navigation/Nav';

class Cameras extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.paginationNext = this.paginationNext.bind(this);
    this.paginationPrevius = this.paginationPrevius.bind(this);
    this.handleItemPerPage = this.handleItemPerPage.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderFoundItem = this.renderFoundItem.bind(this);

    this.state = {
      cameras: [],
      inputVal: '',
      currentPage: 1,
      pages: null,
      itemPerPage: 4,
      foundItem: []
    }
  }
  
  handleInputChange(e) {
    const data = {
      "query": {
             "match" : {
                 "name" : {
                     "query" : e.target.value
                 }
             }
         }
   }


    fetch(`http://localhost:9200/_search`, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.hits.hits[0]) {
          this.setState({foundItem: data.hits.hits[0]._source})
        } else {
          this.setState({foundItem: []})
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

  renderList() {
    return (
      this.state.cameras.map((camera, index) => 
        <Item 
          key={index}
          name={camera.name} 
          amount={camera.amount}
          desc={camera.desc}
          price={camera.price}

        />)
    )
  }

  renderFoundItem() {
    return (
      <Item 
        name={this.state.foundItem.name}
        amount={this.state.foundItem.amount}
        desc={this.state.foundItem.desc}
        price={this.state.foundItem.price}
      />
    )
  }

  render() {
    return (
      <div className='layout'>
        <Navigation onItemPerPage={this.handleItemPerPage}/>
        
        <div className='items'>
          <SearchBar onSearch={this.handleInputChange}/>
          <h3 className='items__title'>Cameras</h3>
                    
          <ul>
            {this.state.foundItem.name ? this.renderFoundItem() : this.renderList()}
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

export default Cameras;