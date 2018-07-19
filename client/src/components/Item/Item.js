import React, { Component } from 'react';
import style from './Item.scss';

const Camera = (props) => (
  <div className='camera'>
    <div className='camera__heading'>
      <h3 className='camera__heading-title'>{props.name}</h3>
      <p className='camera__heading-price'>$ {props.price}</p>
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
      <p className='camera__body-desc'>{props.desc} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam molestiae itaque ducimus nostrum omnis, expedita exercitationem aspernatur consequuntur mollitia maiores harum ipsa id doloremque sunt. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, illo!</p>
      
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
     
     <div>
       {sessionStorage.getItem('token') ? <button className='camera__closeBtn' onClick={() => props.deleteItem(props.id)}><i className="fas fa-times"></i></button> : false}
     </div>

  </div>
);

export default Camera;