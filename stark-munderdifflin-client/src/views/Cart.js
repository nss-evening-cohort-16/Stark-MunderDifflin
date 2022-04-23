import React, { useState } from 'react';
import CartItem from '../components/CartItem';

export default function Cart() {
  const [cartItems] = useState([
    {
      Quantity: 3,
      Id: 1,
      Name: 'Arches 88 Sild Screen Paper',
      Color: 'White',
      Width: 30,
      Length: 22,
      Weight: 140,
      Price: 2.99,
      ImageUrl: 'https://i.imgur.com/3aucv1x.jpg',
    },
    {
      Quantity: 2,
      Id: 3,
      Name: 'Legion Somerset Printmaking Paper',
      Color: 'Antique',
      Width: 44,
      Length: 30,
      Weight: 280,
      Price: 3.99,
      ImageUrl: 'https://i.imgur.com/jKFsoJs.jpg',
    },
  ]);
  return (
    <div className='cart-container'>
      <div className='cart-items-container'>
        {cartItems.map((item) => (
          <CartItem key={item.Id} item={item} />
        ))}
      </div>
      <button className='btn btn-success cart-submit'>Submit</button>
    </div>
  );
}
