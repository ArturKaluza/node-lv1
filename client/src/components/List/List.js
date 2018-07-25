import React, { component } from 'react';
import { NavLink } from 'react-router-dom';

import Item from '../Item/Item';
import style from './List.scss';


const List = (props) => {
  return (
    <ul>
      {props.list.map((item, index ) => 
          <Item 
            key={index}
            name={item.name}
            amount={item.amount}
            price={item.price}
            desc={item.desc}
            id={item._id}
            deleteItem={props.deleteItem}
            itemType={item.itemType}
            item={item}
          />
      )}
    </ul>
  )
}

export default List;