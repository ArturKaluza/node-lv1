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
    this.renderFoundItems = this.renderFoundItems.bind(this);

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
    const data = {
      "query": {
        "regexp":{
          "name": e.target.value + ".*"
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
          this.setState({foundItems: data.hits.hits})
        } else {
          this.setState({foundItems: []})
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

  renderFoundItems() {
    return (
      this.state.foundItems.map((foundItem, index) => 
        <Item 
          key={index}
          name={foundItem._source.name}
          amount={foundItem._source.amount}
          desc={foundItem._source.desc}
          price={foundItem._source.price}
      />
      )      
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
            {this.state.foundItems[0] ? this.renderFoundItems()  : this.renderList()}
          </ul>

          <div className='items__btn'>
          {!this.state.foundItems.name && ((this.state.currentPage > 1) && (this.state.currentPage <= this.state.pages) && <button className='items__btn-prev btn' onClick={this.paginationPrevius} >Previus</button>)}
          {!this.state.foundItem && ((this.state.pages && !(this.state.currentPage === this.state.pages) ) && <button className='items__btn-next btn' onClick={this.paginationNext} >Next</button>)}
          </div>
        </div>
      </div>
    )
  }
}

export default Cameras;