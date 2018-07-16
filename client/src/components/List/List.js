import React, { component } from 'react';

import Item from '../Item/Item'

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
        />
      )}
    </ul>
  )
}

export default List;