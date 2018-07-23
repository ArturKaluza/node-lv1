import React from 'react';
import style from './Spinner.scss';

const Spinner = () => {
  return (
    <div className='spinner'>
      <div className='spinner__body' ></div>
      <h3 className='spinner__text'>Loading...</h3>
    </div>
  )
}

export default Spinner;