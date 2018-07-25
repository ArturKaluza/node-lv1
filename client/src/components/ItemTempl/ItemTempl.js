import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './ItemTempl.scss';

const ItemTempl = (props) => {
    return (
    <div>
      <div className='camera temp'>
        <div className='camera__heading'>
          <h3 className='camera__heading-title'>{props.location.state.item.name}</h3>
          <p className='camera__heading-price'>$ {props.location.state.item.price}</p>
        </div>
  
      <div className='camera__star'>
        <div className='camera__star-icons'>
          <i className="camera__star-iconFull fas fa-star"></i>
          <i className="camera__star-iconFull fas fa-star"></i>
          <i className="camera__star-iconFull fas fa-star"></i>
          <i className="camera__star-iconEmpty fas fa-star"></i>
          <i className="camera__star-iconEmpty fas fa-star"></i>
        </div>
      </div>
  
      <div className='camera__body'>
        <p className='camera__body-desc'>{props.location.state.item.desc} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam molestiae itaque ducimus nostrum omnis, expedita exercitationem aspernatur consequuntur mollitia maiores harum ipsa id doloremque sunt. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, illo!</p>
        
        <div className='camera__body-icons'>
          <i className="camera__body-icon fas fa-check"></i>
          <p className='camera__body-iconText'>Quam molestiae itaque</p>
        </div>
        
        <div className='camera__body-icons'>
          <i className="camera__body-icon fas fa-check"></i>
          <p className='camera__body-iconText'>Sit amet consectetur</p>
        </div>
        
        <div className='camera__body-icons'>
          <i className="camera__body-icon fas fa-check"></i>
          <p className='camera__body-iconText'>expedita exercitationem aspernature</p>
        </div>
      </div>
      
      <div className='camera__cart'>
      <i className="camera__cart-icon fas fa-shopping-cart"></i>
      <h3 className="camera__cart-text">Add To Cart</h3>
      </div>
          
    </div>

    <Link to={`/${props.location.state.item.itemType}s`} className='form__body-btn btn'>
      Go Back
    </Link>
      
  </div>
    
    )
  }

export default ItemTempl;